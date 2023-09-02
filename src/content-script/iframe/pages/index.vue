
<template>
    <header>
        <div class="flex w-full h-12 px-2 ">
            <div class="flex w-11/12 items-center">
                <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="InfoFilled"
                    @confirm="clearAllData" icon-color="#626AEF" title="Are you sure about deleting all the data?">
                    <template #reference>
                        <ElButton size="small" type="danger" round class="bg-red-300" @click="showConfirmation()">clear all
                            data
                        </ElButton>
                    </template>
                </el-popconfirm>
                <ElButton size="small" type="primary" round class="bg-blue-300" @click="copyData()">copy to clipboard
                </ElButton>
            </div>
            <!-- Setting -->
            <div class="flex justify-center items-center mr-3">
                <el-dropdown trigger="click" size="small">
                    <ElButton :icon="Setting" size="normal" circle />
                    <template #dropdown>
                        <el-dropdown-menu class="bg-gray-200">
                            <RouterLink to="/template"><el-dropdown-item :icon="Tools">Customize Template</el-dropdown-item></RouterLink>
                            <el-dropdown-item :icon="CircleCloseFilled" @click="closeSideBar()">Close Sidebar</el-dropdown-item>
                            <el-dropdown-item :icon="CopyDocument" @click="copyEmail()">Feedback</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="border-b border-1 border-gray-300"></div>
    </header>
    <main>
        <view v-for="(snippetList, index) in contentContainer.contentList" :key="index">
            <view v-if="snippetList.length > 0">
                <div class="rounded-lg overflow-hidden shadow-xl m-2 border-gray-500" :class="bg_color_arr[index % 5]">
                    <div class="flex h-10 w-full" :class="title_bg_color_arr[index % 5]">
                        <div class="flex justify-center items-center w-full">
                            <input :id="'title_' + index" type="text"
                                class="bg-transparent focus:bg-white text-xs border-none rounded-lg h-6 w-11/12 p-0"
                                :value="snippetList[0].title" @focusout="saveTitle(index)">
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
                                <p class="text-gray-400 text-xs text-left break-words "><cite class="whitespace-pre-wrap">{{
                                    clipSelectedText(snippet.selected_text) }}</cite></p>
                                <!-- 用于展示文本 -->
                                <div :id="'show_inputText_' + index + sIndex" class="mt-1">
                                    <p class="text-gray-700 text-xs text-left break-words whitespace-pre-wrap">
                                        {{ snippet.input_text }}
                                    </p>
                                </div>
                                <!-- 用于编辑文本 -->
                                <textarea :id="'editable_inputText_' + index + sIndex" hidden
                                    @input="autoResize(index, sIndex)"
                                    class="mt-1 bg-transparent w-full resize-none border-none outline-0 focus:outline-none focus:shadow-outline text-gray-700 text-xs text-left break-words p-0"
                                    :value="snippet.input_text" />
                            </div>
                            <div class="flex justify-end items-end m-1 ">
                                <!-- 进入编辑状态时展示 -->
                                <ElButton :id="'check_btn_' + index + sIndex" hidden :icon="Check" size="small" circle plain
                                    @click="saveInputText(index, sIndex)"></ElButton>
                                <ElButton :id="'close_btn_' + index + sIndex" hidden :icon="Close" size="small" circle plain
                                    @click="cancelInputText(index, sIndex)"></ElButton>
                                <!-- 进入展示状态时展示 -->
                                <ElButton :id="'edit_btn_' + index + sIndex" :icon="Edit" size="small" circle plain
                                    @click="editInputText(index, sIndex)"></ElButton>
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
    InfoFilled,
    Check,
    Close,
    Tools,
    Setting,
    CircleCloseFilled,
    CopyDocument
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

function saveTitle(index: number) {
    let snippetList: object[] = contentContainer.contentList[index];
    if (snippetList !== undefined && snippetList.length > 0) {
        let newTitle: string = document.getElementById('title_' + index).value;
        snippetList[0].title = newTitle;
        chrome.runtime.sendMessage({ update_data: snippetList[0] });
    }
}

function editTitle(index: number) {
    const titleNode = document.getElementById('title_' + index);
    if (titleNode !== null) {
        titleNode.select();
        titleNode.focus();
    }
}

function editInputText(index: number, sIndex: number) {
    const pNode = document.getElementById('show_inputText_' + index + sIndex);
    if (pNode !== null) {
        let currHeight = pNode.offsetHeight > 40 ? pNode.offsetHeight : 40;
        const textareaNode = document.getElementById('editable_inputText_' + index + sIndex);
        if (textareaNode !== null) {
            const editNode = document.getElementById('edit_btn_' + index + sIndex);
            const checkNode = document.getElementById('check_btn_' + index + sIndex);
            const closeNode = document.getElementById('close_btn_' + index + sIndex);
            if (checkNode !== null && editNode !== null && closeNode !== null) {
                checkNode.hidden = false;
                closeNode.hidden = false;
                editNode.hidden = true;
            }

            textareaNode.innerText = pNode.innerText;
            pNode.hidden = true
            textareaNode.style.minHeight = '' + currHeight + 'px';
            textareaNode.hidden = false;
            textareaNode.focus();
        }
    }
}

function autoResize(index: number, sIndex: number) {
    const textareaNode = document.getElementById('editable_inputText_' + index + sIndex);
    if (textareaNode !== null) {
        textareaNode.style.height = "auto";
        textareaNode.style.height = textareaNode.scrollHeight + "px";
    }
}

function saveInputText(index: number, sIndex: number) {
    const pNode = document.getElementById('show_inputText_' + index + sIndex);
    const textareaNode = document.getElementById('editable_inputText_' + index + sIndex);
    if (pNode !== null && textareaNode !== null) {
        const editNode = document.getElementById('edit_btn_' + index + sIndex);
        const checkNode = document.getElementById('check_btn_' + index + sIndex);
        const closeNode = document.getElementById('close_btn_' + index + sIndex);
        if (checkNode !== null && editNode !== null && closeNode !== null) {
            checkNode.hidden = true;
            closeNode.hidden = true;
            editNode.hidden = false;
        }

        // 获取inputTextNode的value
        let newText = textareaNode.value;
        pNode.innerText = newText;
        textareaNode.hidden = true;
        pNode.hidden = false;

        // TODO 通知background.js更新newText
        let snippetList: object[] = contentContainer.contentList[index];
        if (snippetList !== undefined && snippetList.length > 0) {
            snippetList[sIndex].input_text = newText;
            chrome.runtime.sendMessage({ update_data: snippetList[sIndex] });
        }
    }
}

function cancelInputText(index: number, sIndex: number) {
    const pNode = document.getElementById('show_inputText_' + index + sIndex);
    const textareaNode = document.getElementById('editable_inputText_' + index + sIndex);
    if (pNode !== null && textareaNode !== null) {
        const editNode = document.getElementById('edit_btn_' + index + sIndex);
        const checkNode = document.getElementById('check_btn_' + index + sIndex);
        const closeNode = document.getElementById('close_btn_' + index + sIndex);
        if (checkNode !== null && editNode !== null && closeNode !== null) {
            checkNode.hidden = true;
            closeNode.hidden = true;
            editNode.hidden = false;
        }
        pNode.hidden = false;
        textareaNode.hidden = true;
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
                offset: 48,
                duration: 1000
            })
        });

    });

}

function copyEmail() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, { copy_email: 'chenmutime@outlook.com' }, function (response) {
            ElMessage({
                message: 'Email copied!',
                type: 'success',
                offset: 48,
                duration: 2000
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

// send message to content-script
function closeSideBar() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        chrome.tabs.sendMessage(tabs[0].id, { close_sidebar: true }, function (response) {
            console.log(JSON.stringify(response));
        });

    });
}

const bg_color_arr: string[] = ["bg-green-50", "bg-yellow-50", "bg-red-50", "bg-lime-50", "bg-violet-50"];
const title_bg_color_arr: string[] = ["bg-green-100", "bg-yellow-100", "bg-red-100", "bg-lime-100", "bg-violet-100"];

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;</style>
