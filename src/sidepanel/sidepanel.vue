<script setup lang="ts">
import { reactive } from 'vue'
import { clipSelectedText } from '../common/helper'

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
        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.refresh_data) {
        fetchData();
    }
});

function clearAllData() {
    alert('清除所有数据?');
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

function copyData() {
    if (contentContainer.contentList.length === 0) {
        return;
    }

    let data: string = formatDataToText(contentContainer.contentList);
    navigator.clipboard.writeText(data)
        .then(function () {
            console.log("Data copied to clipboard");
            alert("数据已复制到剪切板");
        })
        .catch(function (error) {
            console.error("Error copying to clipboard:", error);
        });
}

function formatDataToText(contentList: object[]) {
    let formattedText = "";

    contentList.forEach(content => {
        let snippetList: object[] = content;
        if (snippetList.length > 0) {
            let url: string = snippetList[0].url;
            formattedText += url + "\n";
        }
        snippetList.forEach(snippet => {
            let selectedText: string = snippet.selected_text;
            let inputText: string = snippet.input_text;

            let tmpObject: string = "";
            tmpObject += "-------------------------------\n";
            tmpObject += selectedText;
            if (inputText !== undefined && inputText !== "") {
                tmpObject += "\n";
                tmpObject += inputText;
            }
            tmpObject += "\n";

            formattedText += tmpObject;
        });
        formattedText += "\n";
    });

    return formattedText;
}
const bg_color_arr: string[] = ["bg-green-50", "bg-yellow-50", "bg-red-50", "bg-lime-50", "bg-violet-50"];
const title_bg_color_arr: string[] = ["bg-green-100", "bg-yellow-100", "bg-red-100", "bg-lime-100", "bg-violet-100"];

</script>

<template>
    <main>
        <div class="w-full justify-start items-start px-2">
            <button class="mx-2 my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded"
                @click="clearAllData()">Clear</button>
            <button class="mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded"
                @click="copyData()">Copy</button>
        </div>
        <div class="border-b border-1 border-gray-300"></div>
        <view v-for="(snippetList, index) in contentContainer.contentList" :key="index">
            <view v-if="snippetList.length > 0">
                <div class="rounded overflow-hidden shadow-xl m-4 border-gray-500 border-solid"
                    :class="bg_color_arr[index % 5]">
                    <!-- 标题，自动换行 -->
                    <div class="font-bold text-sm p-2 text-left break-all" :class="title_bg_color_arr[index % 5]"
                        :href="snippetList[0].url">{{ snippetList[0].url }}</div>

                    <!-- 根据index获取随机颜色 -->
                    <view v-for="(snippet, sIndex) in snippetList" :key="sIndex">
                        <!-- 清除图标，只清除html节点，并不清除实际节点 -->
                        <div class="p-2">
                            <div class="mx-1">
                                <p class="text-gray-400 text-xm text-left break-all">“{{
                                    clipSelectedText(snippet.selected_text) }}”</p>
                                <p class="text-gray-700 text-base text-left break-all">{{ snippet.input_text }}</p>
                            </div>
                            <div class="flex justify-end items-end mx-1 ">
                                <img id="id_trash" src="../assets/trash.png" class="h-5 w-5 hover:bg-teal-500 rounded-lg"
                                    @click="cleatData(snippet.url, snippet.timestamp)">
                            </div>
                        </div>
                        <!-- 分割线 -->
                        <view v-if="(sIndex + 1) < snippetList.length">
                            <div class="border-b border-gray-300"></div>
                            <br>
                        </view>
                    </view>
                </div>
            </view>
        </view>
    </main>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
