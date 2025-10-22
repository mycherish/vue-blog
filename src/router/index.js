import { createRouter, createWebHistory } from 'vue-router'

// 定义路由信息
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/ledger',
    name: 'ledger',
    component: () => import('@/views/LedgerPage.vue'),
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
