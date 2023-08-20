<script setup lang="ts">

let contentList: object[] = [];
fetchData();

function fetchData() {
    chrome.storage.local.get(["text_list"]).then((result) => {
        contentList = result['text_list'];
        console.log("Value currently is " + JSON.stringify(contentList));
        const listNode = document.getElementById('id_list');
        if (listNode) {
            listNode.innerHTML = JSON.stringify(contentList);
        }
    });
}

</script>

<template>
    <main>
        <button @click="fetchData()">刷新列表</button>
        <p id="id_list">

        </p>
        
        <view v-if="contentList.length > 0">
            <view v-for="(item, index) in contentList" :key="index">
                {{ item }}
            </view>
        </view>
        <view v-else>暂无数据</view>
    </main>
</template>