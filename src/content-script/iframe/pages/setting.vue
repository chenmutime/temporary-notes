<template>
  <el-container>
    <el-header class="flex h-12 px-2 bg-gray-300 items-center ">
        <!-- 返回上一页 -->
        <router-link to="/">
          <el-icon size="20" class="mx-2 my-2">
            <Back />
          </el-icon>
        </router-link>
    </el-header>
    <el-main>
      主体内容
    </el-main>
    <el-footer class="fixed bottom-0 w-full h-12 bg-slate-300 text-left items-center ">
      <p>Email address: chenmutime@outlook.com</p>
      <p>We look forward to receiving your feedback.</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;</style>
