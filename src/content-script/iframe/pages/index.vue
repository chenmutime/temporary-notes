
<template>
    <main>
        <div class="flex w-full px-2">
            <div class="flex w-11/12">
                <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="InfoFilled"
                    @confirm="clearAllData" icon-color="#626AEF" title="Are you sure about deleting all the data?">
                    <template #reference>
                        <ElButton type="danger" plain class="mx-2 my-2 py-1.5 px-3" @click="showConfirmation()">Clear
                        </ElButton>
                    </template>
                </el-popconfirm>
                <ElButton type="primary" plain class="mx-2 my-2 py-1.5 px-3" @click="copyData()">Copy</ElButton>
            </div>
            <!-- Setting -->
            <div class="flex justify-center items-center mr-3">
                <RouterLink to="/setting">
                    <el-icon size="20">
                        <Tools />
                    </el-icon>
                </RouterLink>
            </div>
        </div>
        <div class="border-b border-1 border-gray-300"></div>
        <view v-for="(snippetList, index) in contentContainer.contentList" :key="index">
            <view v-if="snippetList.length > 0">
                <div class="rounded-lg overflow-hidden shadow-xl m-4 border-gray-500" :class="bg_color_arr[index % 5]">
                    <div class="flex h-10 w-full" :class="title_bg_color_arr[index % 5]">
                        <div class="flex justify-center items-center w-full">
                            <input :id="'title_' + index" type="text"
                                class="bg-transparent focus:bg-white border-none rounded-lg h-6 w-11/12 p-0"
                                :value="snippetList[0].title" @focusout="changeTitle(index)">
                        </div>
                        <div class="flex justify-center items-center mr-1">
                            <ElButton :icon="Edit" size="small" circle plain @click="editTitle(index)"></ElButton>
                        </div>
                        <div class="flex justify-center items-center mr-3">
                            <el-tooltip class="box-item" effect="light" :content="snippetList[0].url" placement="top">
                                <ElButton :icon="Link" size="small" circle plain @click="linkUrl(snippetList[0].url)">
                                </ElButton>
                            </el-tooltip>
                        </div>
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
                                <ElButton :icon="Delete" size="small" circle plain
                                    @click="clearData(snippet.url, snippet.timestamp)" />
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
        <view v-if="contentContainer.contentList.length <= 0">
            <div class="flex flex-col items-center justify-center h-screen">
                <p class="font-bold my-10">There are no records here yet ...</p>
            </div>
        </view>
    </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { clipSelectedText, KEY_TEXT_LIST } from '../../../common/helper'
import {
    Delete,
    Edit,
    Link,
    InfoFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

let contentContainer = reactive({ contentList: [] });
localFetchData();

function localFetchData() {
    chrome.storage.local.get([KEY_TEXT_LIST]).then((result) => {
        if (result !== undefined && result[KEY_TEXT_LIST] !== undefined) {
            // reset contentContainer.contentList
            contentContainer.contentList = [];

            let dataObject: object = result[KEY_TEXT_LIST];
            Object.keys(dataObject).forEach(url => {
                let snippetList: object[] = dataObject[url];
                contentContainer.contentList.push(snippetList);
            });


        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.refresh_data) {
        localFetchData();
    }
});

function changeTitle(index: number) {
    let snippetList: object[] = contentContainer.contentList[index];
    if (snippetList !== undefined && snippetList.length > 0) {
        let newTitle: string = document.getElementById('title_' + index).value;
        snippetList[0].title = newTitle;
        chrome.runtime.sendMessage({ update_data: snippetList[0] });
        return true;
    }
}

function editTitle(index: number) {
    let titleNode = document.getElementById('title_' + index);
    if (titleNode !== null) {
        titleNode.select();
        titleNode.focus();
    }
}

function linkUrl(url: string) {
    chrome.tabs.create({
        url: url
    });
}

function clearAllData() {
    chrome.runtime.sendMessage({ clear_data: true }).then(() => {
        contentContainer.contentList = [];
    });
}

function showConfirmation() {
    var modal = document.getElementById("confirmationModal");
    if (modal !== null) {
        modal.classList.remove("hidden");
    }
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
    // 通知content-script复制数据到剪贴板
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, { copy_data: data }, function (response) {
            ElMessage({
                message: 'Copied!',
                type: 'success',
            })
        });

    });

}

function formatDataToText(contentList: object[]) {
    let formattedText = "";

    contentList.forEach(content => {
        let snippetList: object[] = content;
        if (snippetList.length > 0) {
            let title: string = snippetList[0].title;
            formattedText += '>>> ' + title;
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


<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
