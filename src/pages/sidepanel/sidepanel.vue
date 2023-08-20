<script setup lang="ts">

let contentList: object[] = [];
fetchData();

function fetchData() {
    chrome.runtime.sendMessage({ fetch_data: true }).then(function (response) {
        console.info('消息响应：' + JSON.stringify(response));
        if (response !== undefined && response.status === 'success') {
            contentList = response.data;

            const listNode = document.getElementById('id_list');
            if (listNode) {
                listNode.innerHTML = JSON.stringify(contentList);
            }
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