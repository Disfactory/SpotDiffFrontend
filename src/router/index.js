import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tutorial',
    name: 'Tutorial',

    component: () => import('../views/Tutorial.vue'),
  },
  {
    path: '/game',
    name: 'Game',

    component: () => import('../views/Game.vue'),
  },
  {
    path: '/ending',
    name: 'Ending',

    component: () => import('../views/EndingPage.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// calculate view time of each page
router.afterEach((to) => {
  if (window.ga) {
    window.ga('set', { page: to.fullPath, anonymizeIp: true });
    window.ga('send', 'pageview');
  }
});
export default router;
