
export { }


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "RecordQuickly",
        "title": "快速记录",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info) {
    // 当前页面的url
    const url = info?.pageUrl;
    chrome.windows.create({
        type: 'popup',
        url: '/src/options/index.html?selectedText=' + info.selectionText + '&url=' + url,
        width: 350,
        height: 300,
        left: 700,
        top: 500
    });
});


chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
