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
            Object.keys(snnipetObject).forEach(url => {
                let snippetList: object[] = snnipetObject[url];
                contentContainer.contentList.push(snippetList);
            });
            console.info('历史数据：' + JSON.stringify(contentContainer.contentList));
        }
    });
}

function clearAllData() {
    chrome.runtime.sendMessage({ clear_data: true });
    contentContainer.contentList = [];
}

function cleatData(url: string, timestamp: number) {
    let item = { url: url, timestamp: timestamp }
    chrome.runtime.sendMessage({ clear_data: true, item: item });
    contentContainer.contentList.forEach(snippetList => {
        snippetList.forEach(item => {
            if (item.url === url && item.timestamp === timestamp) {
                snippetList.splice(snippetList.indexOf(item), 1);
            }
        });
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
        <view v-for="(snippetList, index) in contentContainer.contentList" :key="index"
            style="display: block;margin: 5px 5px;">
            <view v-if="snippetList.length > 0">
                <h3>{{ snippetList[0].url }}</h3>
                <!-- 根据index获取随机颜色 -->
                <view v-for="(snippet, sIndex) in snippetList" :key="sIndex">
                    <!-- 清除图标，只清除html节点，并不清除实际节点 -->
                    <view class="selectedText">{{ snippet.selected_text }}</view>
                    <view class="inputText">{{ snippet.input_text }}</view>
                    <button @click="cleatData(snippet.url, snippet.timestamp)">clear</button>
                </view>
            </view>
        </view>
    </main>
</template>

<style scoped>  .selectedText {
      font-size: smaller;
      color: rgb(200, 200, 200);
      display: block;
      margin: 5px 5px;
  }

  .inputText {
      font-size: small;
      color: black;
      display: block;
      margin: 5px 5px;
  }
</style>