import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

/** app 子窗口的路由 */
const windowRoutes: RouteRecordRaw[] = [
  {
    path: '/qr-code',
    name: 'qr-code',
    component: () => import('@renderer/pages/QR.vue')
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'name',
    component: () => import('@renderer/pages/Home.vue')
  },
  ...windowRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;