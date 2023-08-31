<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';


</script>

<template>
    <header>
        <!-- 返回上一页 -->

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