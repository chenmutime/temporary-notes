<script setup lang="ts">

let inputText: string;
// 获取URL中的查询参数
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// 获取传递的值
const selectedText = urlParams.get('selectedText');
const url = urlParams.get('url');
// 截取选中的文本
var viewSelectedText = selectedText;
if (viewSelectedText !== null && viewSelectedText?.length > 120) {
  viewSelectedText = viewSelectedText?.substring(0, 120) + '...';
}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'Enter') {
    let content = {
      selected_text: selectedText,
      url: url,
      input_text: inputText,
      timestamp: new Date().getTime()
    };
    // 将selectedText和url发送到background.js
    chrome.runtime.sendMessage({ save_data: content }).then(function (response) {
      console.info('消息响应：' + JSON.stringify(response));
      // 关闭浮窗
      window.close();
    });
  }
});

</script>

<template>
  <!-- 定义一个面板，位于屏幕正中央 -->
  <main>
    <p>{{ viewSelectedText }}</p>
    <textarea v-model="inputText" placeholder="Enter your thoughts"></textarea>
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
