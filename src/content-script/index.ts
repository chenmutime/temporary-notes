import './index.scss'
import { SnnipetObject } from '../common/SnippetObject'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let data = null;
  if (iframe && request.execute_iframe) {
    if (document.body?.contains(iframe)) {
      hideIframe()
    } else {
      showIframe()
    }
  } else if (request.copy_data) {
    navigator.clipboard.writeText(request.copy_data)
  } else if (request.close_sidebar) {
    hideIframe()
  } else if (request.get_selected_text) { 
    data = getSelectedHtml();
  }
  sendResponse({
    status: 'success',
    data: data
  })
})

function getSelectedHtml() { 
  const selection = window.getSelection();
  // Check if there is any selected content
  if (selection !== null && selection.rangeCount > 0) {
    // Retrieve the selected range
    const range = selection.getRangeAt(0);
    // Create a temporary div element
    const div = document.createElement('div');

    // Clone the selected range and add it to the div element
    div.appendChild(range.cloneContents());

    // Retrieve the HTML text from the div element
    return div.innerHTML;
  }
  return '';
}

function showIframe() {
  if (iframe) {
    iframe.classList.remove('ifram-animation-out')
    iframe.classList.add('ifram-animation-in')
    document.body?.appendChild(iframe)
  }
}

function hideIframe() {
  if (iframe) {
    iframe.classList.add('ifram-animation-out')
    iframe.classList.remove('ifram-animation-in')
    iframe.addEventListener("animationend", handleAnimationEnd);
  }
}

function handleAnimationEnd() {
  if (iframe) {
    iframe.removeEventListener("animationend", handleAnimationEnd);
    document.body?.removeChild(iframe)
  }
}