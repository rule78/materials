import { MisApp, OmsMainEntry } from 'jk-mis-lib/build';
import 'babel-polyfill';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import iview from 'iview';
import { getLongToken } from '@/services/auth';
import { setLocalStorage } from '@/utils';
import { resetEnv, JWT_LOCALSTORAGE_KEY } from '@/config/api';
// import ActionLog from '@/components/ActionLog';
import App from './App';
import store from './store/';
import router from './router/';
import './iview.less';
// 日志
// Vue.component('ActionLog', ActionLog);

(new OmsMainEntry()).loadConfig(async (e) => {
  resetEnv(e);
  try {
    const { data } = await getLongToken();
    setLocalStorage(JWT_LOCALSTORAGE_KEY, data);
  } finally {
    (new MisApp(Vue, App, {
      sync, router, store, iview,
    })).run('#app');
  }
});

