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
    name: 'index',
    redirect: 'like',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@renderer/pages/IndexChildren/home.vue')
      },
      {
        path: 'like',
        name: 'like',
        component: () => import('@renderer/pages/IndexChildren/like.vue')
      }
    ],
    component: () => import('@renderer/pages/index.vue')
  },
  ...windowRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;