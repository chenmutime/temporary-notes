<script setup lang="ts">
import { h, ref } from 'vue'

// 获取URL中的查询参数
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// 获取传递的值
const selectedText = urlParams.get('selectedText');
const url = urlParams.get('url');
console.info(url);
// 截取选中的文本
var subSelectedText = selectedText;
if (subSelectedText !== null && subSelectedText?.length > 120) {
  subSelectedText = subSelectedText?.substring(0, 120) + '...';
}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'Enter') {
    // 保存选中的文本内容到本地缓存
    chrome.storage.local.set({ selectedText: subSelectedText }, function () {
      // 关闭浮窗
      window.close();
    });

  }
});
</script>

<template>
  <!-- 定义一个面板，位于屏幕正中央 -->
  <main>
    <p>{{ subSelectedText }}</p>
    <textarea placeholder="Enter your thoughts"></textarea>
  </main>
</template>

<style>
main {
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  text-align: left;
}

textarea {
  width: 96%;
  height: 130px;
  border: 1px solid #ccc;
  padding: 0.1em;
  resize: none;
}

p {
  padding: 0.1em;
  font-size: small;
  font-display: block;
  color: #9a9797;
  text-align: left;
}
</style>
