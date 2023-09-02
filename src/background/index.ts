import { KEY_TEXT_LIST } from '../common/helper'
import { SnnipetObject } from '../common/SnippetObject'

export { }


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "RecordQuickly",
        "title": "Quick Record",
        "contexts": ["selection"]
    });
});

// 监听logo点击事件，打开/关闭sidebar
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { execute_iframe: "true", url: tabs[0].url });
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

// 接收来自其他js页面发送过来的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.save_data) {
        saveData(request.save_data);
        sendResponse({
            status: 'success'
        });
    } else if (request.clear_data) {
        if (request.item) {
            fetchData(function (dataObject: object) {
                const pageUrl: string = request.item['url'];
                let snnipetObjectList: object[] = dataObject[pageUrl];
                if (snnipetObjectList) {
                    snnipetObjectList.forEach(snnipetObject => {
                        if (snnipetObject.timestamp === request.item['timestamp']) {
                            snnipetObjectList.splice(snnipetObjectList.indexOf(snnipetObject), 1);
                        }
                    });
                }
                dataObject[request.item['url']] = snnipetObjectList;
                chrome.storage.local.set({ text_list: dataObject });
                sendResponse({
                    status: 'success'
                });
            });
        } else {
            chrome.storage.local.remove(KEY_TEXT_LIST);
        }
    } else if (request.update_data) {
        updateDate(request.update_data);
        sendResponse({
            status: 'success'
        });
    }
});

function fetchData(postFunctionCallback: (snnipetObject: object) => void) {
    chrome.storage.local.get([KEY_TEXT_LIST], result => {
        if (result !== undefined && result[KEY_TEXT_LIST] !== undefined) {
            let snnipetObject: object = result[KEY_TEXT_LIST];
            postFunctionCallback(snnipetObject);
        }
    });
}

// {'www.baidu.com': [{}{}]}
function saveData(snippet: SnnipetObject) {
    // 保存选中的文本内容到本地缓存
    chrome.storage.local.get([KEY_TEXT_LIST], result => {
        let dataObject: object = result[KEY_TEXT_LIST];
        if (dataObject !== undefined) {
            let snippetList: object[] = dataObject[snippet.url];
            if (snippetList === undefined) {
                snippetList = [];
            }
            snippetList.push(snippet);
            dataObject[snippet.url] = snippetList;
        } else {
            dataObject = {};
            let snippetList: object[] = [snippet];
            dataObject[snippet.url] = snippetList;
        }
        chrome.storage.local.set({ text_list: dataObject }).then(function () {
            chrome.runtime.sendMessage({ refresh_data: true });
        });
    });
}

function updateDate(snippet: SnnipetObject) {
    chrome.storage.local.get([KEY_TEXT_LIST], result => {
        let dataObject: object = result[KEY_TEXT_LIST];
        if (dataObject !== undefined) {
            let snippetList: object[] = dataObject[snippet.url];
            if (snippetList !== undefined) {
                snippetList.forEach(function (item: object) {
                    item.title = snippet.title;
                });
            }
        }
        chrome.storage.local.set({ text_list: dataObject }).then(function () {
            chrome.runtime.sendMessage({ refresh_data: true });
        });
    });
}