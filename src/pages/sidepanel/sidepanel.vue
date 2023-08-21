<script setup lang="ts">
import { reactive } from 'vue'

let contentContainer = reactive({ contentList: [] });
fetchData();

function fetchData() {
    chrome.storage.local.get(["text_list"]).then((result) => {
        if (result !== undefined && result['text_list'] !== undefined) {
            // reset contentContainer.contentList
            contentContainer.contentList = [];

            let snnipetObject: object = result['text_list'];
            Object.keys(snnipetObject).forEach(key => {
                let snippetList: object[] = snnipetObject[key];
                if (snippetList !== undefined && snippetList.length > 0) {
                    for (let i = 0; i < snippetList.length; i++) {
                        contentContainer.contentList.push(snippetList[i]);
                    }
                }
            }
            , (error) => { 
                    console.error(error);
                }
            );
        }
    });
}

function clearAllData() {
    chrome.runtime.sendMessage({ clear_data: true}).then(response => {
        console.info('清除历史记录：' + JSON.stringify(response));
        fetchData();
    }, error => {
        console.error(error);
    });
}

function cleatData(url: string, timestamp: number) {
    let item = { url: url, timestamp: timestamp }
    chrome.runtime.sendMessage({ clear_data: true, item: item });
    contentContainer.contentList.forEach(item => {
        if (item.url === url && item.timestamp === timestamp) {
            contentContainer.contentList.splice(contentContainer.contentList.indexOf(item), 1);
        }
    });
}

function exportData() {

}

</script>

<template>
    <main>
        <button @click="fetchData()">刷新</button>
        <button @click="clearAllData()">清除</button>
        <button @click="exportData()">导出</button>
        <view id="id_list">

        </view>
        <view v-for="(content, index) in contentContainer.contentList" :key="index" style="display: block;margin: 5px 5px;">
            <!-- 清除图标，只清除html节点，并不清除实际节点 -->
            <button @click="cleatData(content.url, content.timestamp)">clear</button>
            <h3>{{ content.url }}</h3>
            <view style="display: block;margin: 5px 5px;">{{ content.selected_text }}</view>
            <view style="display: block;margin: 5px 5px;">{{ content.input_text }}</view>
        </view>
    </main>
</template>