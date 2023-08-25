<script setup lang="ts">
import { clipSelectedText } from '../common/helper'

let inputText: string;
// 获取URL中的查询参数
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// 获取传递的值
const selectedText = urlParams.get('selectedText');
const url = urlParams.get('url');
// 截取选中的文本
var viewSelectedText = clipSelectedText(selectedText);

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'Enter') {
    submitText();
  }
});

function submitText() {
  let content = {
    selected_text: selectedText,
    url: url,
    input_text: inputText,
    timestamp: new Date().getTime()
  };
  // 将selectedText和url发送到background.js
  chrome.runtime.sendMessage({ save_data: content }).then(function (response) {
    // 关闭浮窗
    window.close();
  });
}

onMounted(function () {
  // 光标焦点自动落入textarea中
  document.getElementsByTagName('textarea')[0].focus();
});
</script>

<template>
  <!-- 定义一个面板，位于屏幕正中央 -->
  <main>
    <div class="w-full justify-center text-center items-center">
      <p class="text-gray-400 text-xm text-left m-3">{{ viewSelectedText }}</p>
      <textarea v-model="inputText" class="p-1 m-1 w-11/12 h-32 text-sm items-center resize-none border-gray-300 bg-gray-100" placeholder="Enter your thoughts. (Ctrl+Enter)"></textarea>
    </div>
    <div class="w-full justify-end text-right items-end" >
        <button class="mx-4 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded" @click="submitText()">Submit</button>
    </div>
  </main>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
