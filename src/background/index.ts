import { json } from "stream/consumers";

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

// 接收来自其他js页面发送过来的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("receive: " + JSON.stringify(request));
    if (request.save_data) {
        saveData(request.save_data);
        sendResponse({
            status: 'success'
        });
    } else if (request.clear_data) {
        if (request.item) {
            chrome.storage.local.get(['text_list'], result => {
                let snnipetObject: object = result['text_list'];
                if (snnipetObject !== undefined) {
                    let contentList: object[] = snnipetObject[request.item['url']];
                    if (contentList !== undefined) {
                        contentList.forEach(content => {
                            if (content.timestamp === request.item['timestamp']) {
                                contentList.splice(contentList.indexOf(content), 1);
                            }
                        });
                    }
                    snnipetObject[request.item['url']] = contentList;
                    chrome.storage.local.set({ text_list: snnipetObject });
                }
            })
        } else {
            chrome.storage.local.remove('text_list');
        }
    } else if (request.update_data) { 
        updateDate(request.update_data);
    }
});

// {'www.baidu.com': [{}{}]}
function saveData(snippet: object) {
    // 保存选中的文本内容到本地缓存
    chrome.storage.local.get(['text_list'], result => {
        let snnipetObject: object = result['text_list'];
        if (snnipetObject !== undefined) {
            let snippetList: object[] = snnipetObject[snippet.url];
            if (snippetList === undefined) {
                snippetList = [];
            }
            snippetList.push(snippet);
            snnipetObject[snippet.url] = snippetList;
        } else {
            snnipetObject = {};
            let snippetList: object[] = [snippet];
            snnipetObject[snippet.url] = snippetList;
        }
        chrome.storage.local.set({ text_list: snnipetObject }).then(function () {
            chrome.runtime.sendMessage({ refresh_data: true });
        });
    });
}

function updateDate(snippet: object) {
    chrome.storage.local.get(['text_list'], result => {
        let snnipetObject: object = result['text_list'];
        if (snnipetObject !== undefined) {
            let snippetList: object[] = snnipetObject[snippet.url];
            if (snippetList !== undefined) {
                snippetList.forEach(function (item: object) {
                    item.title = snippet.title;
                });
            }
        } 
        chrome.storage.local.set({ text_list: snnipetObject }).then(function () {
            chrome.runtime.sendMessage({ refresh_data: true });
        });
    });
}