import { KEY_TEXT_LIST } from '../common/helper'
import { SnnipetObject } from '../common/SnippetObject'
import '../content-script/index.scss'

export { }

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "RecordQuickly",
        "title": "Quick Record",
        "contexts": ["selection"]
    });

});


chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { execute_iframe: "true", url: tabs[0].url }).then(res => {
            console.log('background: ',JSON.stringify(res));
        });
    });
});

const getSelectedHtml = async () => { 
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { get_selected_text: "true" }).then(res => {
                if (res) {
                    resolve(res.data);
                }
            });
        });
     })
}

chrome.contextMenus.onClicked.addListener(function (info) {
    (async () => {
        const selectedHtml = await getSelectedHtml();
        chrome.windows.create({
            type: 'popup',
            url: '/src/options/index.html?selectedText=' + selectedHtml + '&url=' + info?.pageUrl,
            width: 350,
            height: 300,
            left: 700,
            top: 500
        });
    })();
});

// 接收来自其他js页面发送过来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.save_data) {
        (async () => {
            const result = await saveDataSync(request.save_data);
            if (result) {
                await notifyRefreshData();
            }
            sendResponse({
                status: result
            });
        })();
    } else if (request.clear_data) {
        const snippet = request.snippet;
        if (snippet) {
            fetchData((dataObject: object) => {
                const pageUrl: string = snippet['url'];
                let snnipetObjectList: object[] = dataObject[pageUrl];
                if (snnipetObjectList) {
                    snnipetObjectList.forEach(snnipetObject => {
                        if (snnipetObject.timestamp === snippet['timestamp']) {
                            snnipetObjectList.splice(snnipetObjectList.indexOf(snnipetObject), 1);
                        }
                    });
                }
                dataObject[snippet['url']] = snnipetObjectList;
                chrome.storage.local.set({ text_list: dataObject });
                sendResponse({
                    status: 'success'
                });
            });
        } else {
            chrome.storage.local.remove(KEY_TEXT_LIST);
            sendResponse({
                status: 'success'
            });
        }
    } else if (request.update_data) {
        (async () => {
            const result = await updateDataSync(request.update_data);
            sendResponse({
                status: result
            });
        })();
    } else if (request.select_template) {
        chrome.storage.local.set({
            template: request.select_template
        });
    }
    return true;
});

function fetchData(postFunctionCallback: (snnipetObject: object) => void) {
    chrome.storage.local.get([KEY_TEXT_LIST], result => {
        if (result !== undefined && result[KEY_TEXT_LIST] !== undefined) {
            let snnipetObject: object = result[KEY_TEXT_LIST];
            postFunctionCallback(snnipetObject);
        }
    });
}

const readAllLocalStorage = async () => { 
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([KEY_TEXT_LIST], result => {
            let dataObject: object = result[KEY_TEXT_LIST];
            if (dataObject !== undefined) {
                resolve(result[KEY_TEXT_LIST]);
            } else { 
                resolve(undefined);
            }
         })
    });
}

const saveToLocalStorage = async (dataObject: Snippet) => { 
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ text_list: dataObject }).then(function () {
            resolve(true);
        }).catch(function (err) {
            console.log('Faield to save data to local storage', err);
            resolve(false)
        });
    });
}

const notifyRefreshData = async () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ refresh_data: true }).then(function () {
            resolve(true);
        }).catch(function (err) {
            console.log('Faield to refresh data', err);
            resolve(false)
        });
    });
}

async function saveDataSync(snippet: SnnipetObject) {
    let dataObject = await readAllLocalStorage();
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
    return await saveToLocalStorage(dataObject);
}

async function updateDataSync(snippet: SnnipetObject) { 
    let dataObject = await readAllLocalStorage();
    if (dataObject !== undefined) {
        let snippetList: object[] = dataObject[snippet.url];
        // 更新组内每个snippet的字段
        if (snippetList !== undefined) {
            snippetList.forEach(function (item: object) {
                item.title = snippet.title;
                // timestamp相当于snippet的唯一标识符
                if (item.timestamp === snippet.timestamp) {
                    item.input_text = snippet.input_text;
                }
            });
        }
    }
    return await saveToLocalStorage(dataObject);
}
