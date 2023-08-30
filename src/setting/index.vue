<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';


</script>

<template>
    <header>
        <!-- 返回上一页 -->
        <RouterLink to="/">
            <img src="../assets/back.svg" alt="">
        </RouterLink>
    </header>
    <main>
        <RouterView>
            <List>
                <ListItem>
                    <RouterLink to="/">Template</RouterLink>
                </ListItem>
                <ListItem>
                    <RouterLink to="/">Label</RouterLink>
                </ListItem>
                <ListItem>
                    <RouterLink to="/">Feedback</RouterLink>
                </ListItem>
            </List>
        </RouterView>
    </main>
</template>