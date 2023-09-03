<template>
  <el-container>
    <el-header class="flex h-12 px-2 items-center ">
      <!-- 返回上一页 -->
      <router-link to="/">
        <el-icon size="20" class="mx-2 my-2">
          <Back />
        </el-icon>
      </router-link>
    </el-header>
    <div class="border-b border-1 border-gray-300"></div>
    <el-main>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <!-- built-in templates -->
          <el-collapse-item name="1">
            <template #title>
              Plain text style
              <view v-if="selectedTemplate === 1">
                <el-icon class="header-icon">
                  <CircleCheckFilled />
                </el-icon>
              </view>
            </template>
            <div>
              <p id="template1">
                [group_name]
                <br>
                [url]
                <br><br>
                >>> [snippet]
                <br>
                --- [note]
                <br><br>
              </p>
            </div>
            <div class="flex justify-end items-end m-1 ">
              <ElButton :icon="Edit" size="small" circle plain @click="showTemplateModal('template1')" />
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              Markdown style
              <view v-if="selectedTemplate === 2">
                <el-icon class="header-icon">
                  <CircleCheckFilled />
                </el-icon>
              </view>
            </template>
            <div>
              <p id="show_template2">
                ## group name: [group_name]
                <br>
                *[url]*
                <br><br>
                >[snippet]
                <br><br>
                [note]
                <br><br>
              </p>
            </div>
          </el-collapse-item>
          <!-- custom templates -->

        </el-collapse>
      </div>
    </el-main>
  </el-container>

  <!-- 模态框背景 -->
  <div id="modal" class="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 hidden">
    <!-- 模态框内容 -->
    <div class="bg-white rounded-lg p-8">
      <h3 class="text-2xl font-bold mb-4">Modal Title</h3>
      <textarea id="edit_template" class="border border-gray-300 p-2 mb-4 resize-none w-full" rows="4"
        @input="autoResize()" placeholder="请输入内容"></textarea>
      <div class="flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          @click="saveCustomTemplate">
          提交
        </button>
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          @click="hideTemplateModal">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Edit,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const selectedTemplate = ref(2)
const activeNames = ref([])
const handleChange = (val: string[]) => {
  console.log(val)
}

let currEditingTemlateId: string;

const showTemplateModal = (nodeId: string) => {
  currEditingTemlateId = nodeId;
  var modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  const currEditingTemlate = document.getElementById(currEditingTemlateId);
  const editTemplate = document.getElementById("edit_template");
  if (currEditingTemlate !== null && editTemplate !== null) {
    editTemplate.innerText = currEditingTemlate.innerText;
  }
}

const hideTemplateModal = () => {
  var modal = document.getElementById("modal");
  modal.classList.add("hidden");
  const editTemplate = document.getElementById("edit_template");
  if (editTemplate !== null) {
    editTemplate.innerText = '';
  }
}

const saveCustomTemplate = () => {
  console.log('>>>currEditingTemlateId: ', currEditingTemlateId);
  const currEditingTemlate = document.getElementById(currEditingTemlateId);
  if (currEditingTemlate !== null && editTemplate !== null) {
    currEditingTemlate.innerText = editTemplate.value;

    // TODO 将新的模板发送到localstrage

  }
  hideTemplateModal()
}

function autoResize() {
  const textareaNode = document.getElementById('edit_template');
  if (textareaNode !== null) {
    textareaNode.style.height = "auto";
    textareaNode.style.height = textareaNode.scrollHeight + "px";
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
