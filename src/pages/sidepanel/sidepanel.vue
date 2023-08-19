<script setup lang="ts">
import { h, ref } from 'vue'

let key = 'text_list';
let contentList: object[] = [];
chrome.storage.local.get(key, (res) => {
    if (res !== undefined && res.text_list !== undefined) contentList = res.text_list;
})
</script>

<template>
    <main>
        <!-- 列表 -->
        <view v-if="contentList.length > 0">{{ JSON.stringify(contentList) }}</view>
        <view v-else>暂无数据</view>
    </main>
</template>