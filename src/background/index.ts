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
        if (request.clear_all === true) {
            chrome.storage.local.remove(['text_list']);
        } else {
            const keys = request.clear_data;
            chrome.storage.local.get(['text_list'], result => {
                const contentList = result['text_list'];
                if (contentList !== undefined) {
                    // 如果contentList中每个对象的id字段值属于keys中，则删除该对象
                    keys.forEach(key => {
                        contentList.forEach(content => {
                            if (content.id === key) {
                                // 删除该对象
                                contentList.splice(contentList.indexOf(content), 1);
                            }
                        });
                    });
                    chrome.storage.local.set({
                        text_list: contentList
                    }, () => {
                        sendResponse({
                            status: 'success'
                        });
                    }
                    );
                }
            });
        }
    }
});

function saveData(content: object) {
    // 保存选中的文本内容到本地缓存
    chrome.storage.local.get(['text_list'], result => {
        let contentList: object[] = [];
        if (result['text_list'] === undefined) {
            contentList[0] = content;
        } else {
            // 更新选中的文本内容
            contentList = result['text_list'];
            contentList[contentList.length] = content;
        }
        chrome.storage.local.set({ text_list: contentList }).then(function () {
            console.log('数据成功落库！');
        });
    });
}
