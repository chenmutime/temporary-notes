import './index.scss'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (iframe && request.execute_iframe) {
    document.body?.contains(iframe) ? hideIframe() : showIframe()
  } else if (request.copy_data) {
    navigator.clipboard.writeText(request.copy_data)
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