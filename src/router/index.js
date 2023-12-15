import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Visitor from '../views/visitor.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: Visitor
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
