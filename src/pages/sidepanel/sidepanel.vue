<script setup lang="ts">

let contentList: object[] = [];
fetchData();

function fetchData() {
    chrome.storage.local.get(["text_list"]).then((result) => {
        if(result !== undefined) {
            contentList = result['text_list'];
            console.info('获取历史记录：'+JSON.stringify(contentList));
            const listNode = document.getElementById('id_list');
            if (listNode && contentList !== undefined) {
                if (contentList.length > 0) {
                    let renderViewContent: string = '';
                    for (let i = 0; i < contentList.length; i++) {
                        let selectedText = contentList[i].selected_text;
                        let renderContent:string = '<p>' + selectedText + '</p>';
                        renderViewContent += renderContent;
                    }
                    listNode.innerHTML = renderViewContent;
                } else {
                    listNode.innerHTML = '';
                }
            }
        }
    });
}

function clearData(clearAll: boolean) {
    chrome.runtime.sendMessage({clear_data: true, clear_all: clearAll}).then(response => {
        console.info('清除历史记录：'+JSON.stringify(response));
        fetchData();
    }, error => {
            console.error(error);
    });
}



</script>

<template>
    <main>
        <button @click="fetchData()">刷新</button>
            <button @click="clearData()">清除</button>
        <view id="id_list">

        </view>
    </main>
</template>