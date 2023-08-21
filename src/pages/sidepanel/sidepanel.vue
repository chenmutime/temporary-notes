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
                console.info('snippetList: ' + JSON.stringify(snippetList));
                if (snippetList !== undefined && snippetList.length > 0) {
                    for (let i = 0; i < snippetList.length; i++) {
                        contentContainer.contentList.push(snippetList[i]);
                    }
                    console.info('contentContainer.contentList: ' + JSON.stringify(contentContainer.contentList));
                }
            }
            , (error) => { 
                    console.error(error);
                }
            );
        }
    });
}

function clearData(clearAll: boolean) {
    chrome.runtime.sendMessage({ clear_data: ['id_kqwwqiew'], clear_all: clearAll }).then(response => {
        console.info('清除历史记录：' + JSON.stringify(response));
        fetchData();
    }, error => {
        console.error(error);
    });
}

function exportData() {

}

</script>

<template>
    <main>
        <button @click="fetchData()">刷新</button>
        <button @click="clearData(false)">清除</button>
        <button @click="clearData(true)">清除全部</button>
        <button @click="exportData()">到处</button>
        <view id="id_list">

        </view>
        <view v-for="(content, index) in contentContainer.contentList" :key="index">
            <view style="display: block;margin: 10px 10px;">{{ content.selected_text }}</view>
        </view>
    </main>
</template>