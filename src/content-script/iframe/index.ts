import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './iframe.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
// loading router
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'index',
      path: '/index',
      component: () => import('./pages/index.vue')
    },
    {
      name: 'setting',
      path: '/setting',
      component: () => import('./pages/setting.vue')
    }
  ]
})
router.beforeEach((to) => {
  if (to.path === '/') return '/iframe'
})
app.use(router)
// loading Element UI
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)

app.mount('#app')
