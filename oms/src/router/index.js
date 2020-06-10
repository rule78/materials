import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import Login from '@/views/Login';
import Welcome from '@/views/Welcome';
import { name } from '../../package.json';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/list',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/welcome',
    component: Welcome,
  },
];

const router = new Router({
  mode: 'history',
  base: name.replace(/^oms-/, ''),
  routes,
});

export default router;
