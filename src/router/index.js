import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Visitor from '../views/visitor.vue';
import Test from '../views/xlsx.vue';
import Qrcode from '../views/qrcode.vue';
import Page from '../views/Page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: Visitor
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/qrcode',
    name: 'Qrcode',
    component: Qrcode
  },
  {
    path: '/page',
    name: 'Page',
    component: Home
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
