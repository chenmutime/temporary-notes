import './index.scss'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')

const iframe = new DOMParser().parseFromString(
  `<iframe class="crx-iframe" src="${src}"></iframe>`,
  'text/html'
).body.firstElementChild


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.execute_iframe) {
    document.body?.contains(iframe) ? hideIframe() : showIframe()
  }
  sendResponse({
    status: 'success'
  })
})
function showIframe() {
  if (iframe) {
    document.body?.appendChild(iframe)
  }
}

function hideIframe() {
  if (iframe) {
    document.body?.removeChild(iframe)
  }
}
