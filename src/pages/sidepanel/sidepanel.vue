<script setup lang="ts">
import { reactive } from 'vue'

let contentContainer = reactive({ contentList: []});
fetchData();

function fetchData() {
    chrome.storage.local.get(["text_list"]).then((result) => {
        if (result !== undefined && result['text_list'] !== undefined){
            console.info('历史记录（全）：' + JSON.stringify(result));
            contentContainer.contentList = result['text_list'];
            console.info('历史记录：' + JSON.stringify(contentContainer.contentList));
            console.info(JSON.stringify(contentContainer.contentList));
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
            {{ content.selected_text }}
        </view>
    </main>
</template>