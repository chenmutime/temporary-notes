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

function changeTitle(index: number) {
    let snippetList: object[] = contentContainer.contentList[index];
    if (snippetList !== undefined && snippetList.length > 0) {
        let newTitle: string = document.getElementById('title_' + index).value;
        snippetList[0].title = newTitle; 
        chrome.runtime.sendMessage({ update_data: snippetList[0] });
    }
    console.log(JSON.stringify(snippetList));
}

function clearAllData() {
    chrome.runtime.sendMessage({ clear_data: true });
    contentContainer.contentList = [];
}

function showConfirmation() {
    var modal = document.getElementById("confirmationModal");
    if (modal !== null) {
        modal.classList.remove("hidden");
    }
}

function closeConfirmation() {
    var modal = document.getElementById("confirmationModal");
    if (modal !== null) {
        modal.classList.add("hidden");
    }
}

function confirmAction() {
    // 在这里执行确认操作的逻辑
    closeConfirmation();
    clearAllData();
}

function clearData(url: string, timestamp: number) {
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
            showSuccessToast();
        })
        .catch(function (error) {
            console.error("Error copying to clipboard:", error);
        });
}

function showSuccessToast() {
    var container = document.getElementById("successToastContainer");
    if (container !== null) {
        container.classList.remove("hidden");
        container.classList.add("flex");

        setTimeout(function () {
            container.classList.add("hidden");
            container.classList.remove("flex");
        }, 2000);
    }
}

function formatDataToText(contentList: object[]) {
    let formattedText = "";

    contentList.forEach(content => {
        let snippetList: object[] = content;
        if (snippetList.length > 0) {
            let title: string = snippetList[0].title;
            formattedText += title;
        }
        snippetList.forEach(snippet => {
            let selectedText: string = snippet.selected_text;
            let inputText: string = snippet.input_text;

            let tmpObject: string = "";
            tmpObject += "\n";
            tmpObject += selectedText;
            if (inputText !== undefined && inputText !== "") {
                tmpObject += "\n";
                tmpObject += inputText;
            }
            tmpObject += "\n";

            formattedText += tmpObject;
        });
        formattedText += "\n\n";
    });

    return formattedText;
}
const bg_color_arr: string[] = ["bg-green-50", "bg-yellow-50", "bg-red-50", "bg-lime-50", "bg-violet-50"];
const title_bg_color_arr: string[] = ["bg-green-100", "bg-yellow-100", "bg-red-100", "bg-lime-100", "bg-violet-100"];

</script>

<template>
    <div id="confirmationModal" class="modal hidden fixed inset-0 mx-auto mt-12 w-40">
        <div class="modal-content bg-white p-4 rounded shadow">
            <h2 class="text-xl font-bold mb-2">确认操作</h2>
            <p class="text-gray-700 mb-4">你确定要执行此操作吗？</p>
            <div class="flex justify-center">
                <button @click="confirmAction()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">确认</button>
                <button @click="closeConfirmation()"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">取消</button>
            </div>
        </div>
    </div>
    <!--  flex items-center justify-center -->
    <div id="successToastContainer" class="toast-container hidden fixed inset-0 mx-auto mt-12 w-full h-10 items-center justify-center">
        <div id="successToast" class="toast bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded w-22">
            操作成功！
        </div>
    </div>
    <main>
        <div class="w-full justify-start items-start px-2">
            <button class="mx-2 my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded"
                @click="showConfirmation()">Clear</button>
            <button class="mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded"
                @click="copyData()">Copy</button>
        </div>
        <div class="border-b border-1 border-gray-300"></div>
        <view v-for="(snippetList, index) in contentContainer.contentList" :key="index">
            <view v-if="snippetList.length > 0">
                <div class="rounded overflow-hidden shadow-xl m-4 border-gray-500 border-solid"
                    :class="bg_color_arr[index % 5]">
                    <!-- 标题，自动换行 -->
                    <div class="font-bold text-sm p-2 text-left break-all" :class="title_bg_color_arr[index % 5]">
                        <input :id="'title_' + index" type="text" class="border-none w-full" :class="title_bg_color_arr[index % 5]" :value="snippetList[0].title" @focusout="changeTitle(index)">
                    </div>

                    <!-- 根据index获取随机颜色 -->
                    <view v-for="(snippet, sIndex) in snippetList" :key="sIndex">
                        <!-- 清除图标，只清除html节点，并不清除实际节点 -->
                        <div class="p-2">
                            <div class="mx-1">
                                <p class="text-gray-400 text-xm text-left break-all"><cite>{{
                                    clipSelectedText(snippet.selected_text) }}</cite></p>
                                <p class="text-gray-700 text-base text-left break-all">{{ snippet.input_text }}</p>
                            </div>
                            <div class="flex justify-end items-end mx-1 ">
                                <img id="id_trash" src="../assets/trash.png" class="h-5 w-5 hover:bg-teal-500 rounded-lg"
                                    @click="clearData(snippet.url, snippet.timestamp)">
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
