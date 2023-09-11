import './index.scss'
import { SnnipetObject } from '../common/SnippetObject'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
  } else if (request.copy_email) {
    navigator.clipboard.writeText(request.copy_email)
  } else if (request.highlight_snippet) { 
    console.log('highlight_snippet: ', JSON.stringify(request.highlight_snippet));
    let originText = document.body?.innerHTML;
    const snippetList: SnnipetObject[] = request.highlight_snippet;
    snippetList.forEach(snippet => { 
      const selectedText = snippet.selected_text;
      originText = originText.replace(selectedText, `<span class="highlight">${selectedText}</span>`);
    });
    document.body.innerHTML = originText;
  } else if (request.highlight_text_remove) { 
    const selectedText = request.highlight_text_remove;
    document.body.innerHTML = document.body?.innerHTML.replace(selectedText, selectedText.replace(/<span class="highlight">/g, '').replace(/<\/span>/g, ''))
  }
  sendResponse({
    status: 'success'
  })
})

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