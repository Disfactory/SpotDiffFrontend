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

export default router;
