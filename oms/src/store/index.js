import vue from 'vue';
import vuex from 'vuex';
import modules from './modules';
import * as types from './types';

const uuid = require('uuid');

vue.use(vuex);

const store = new vuex.Store({
  state: {
    successMessages: {},
    errorMessages: {},
    minimizeMenuBar: false,
    globalAction: {
      type: '',
      key: '',
    },
    loading: {
      productSetting: false,
      productSettingModal: false,
    },
  },
  mutations: {
    [types.ADD_SUCCESS_MESSAGE](state, successMessage) {
      vue.set(state.successMessages, uuid.v4(), successMessage);
    },
    [types.ADD_ERROE_MESSAGE](state, errorMessage) {
      vue.set(state.errorMessages, uuid.v4(), errorMessage);
    },
    [types.TOGGLE_MINIMIZE_MENUBAR](state) {
      state.minimizeMenuBar = !state.minimizeMenuBar;
    },
    [types.REMOVE_ERROE_MESSAGE](state, key) {
      delete state.errorMessages[key];
    },
    [types.REMOVE_SUCCESS_MESSAGE](state, key) {
      delete state.successMessages[key];
    },
    [types.SET_GLOBAL_ACTION](state, action) {
      state.globalAction.type = action.type;
      state.globalAction.key = action.key;
    },
    [types.CHANGE_LOADING_STATE](state, { key, loading = true }) {
      state.loading[key] = loading;
    },
  },
  actions: {
  },
  modules,
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
