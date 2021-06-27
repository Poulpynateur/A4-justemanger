import Vue from 'vue'
import Vuex from 'vuex'

import {Locales, defaultLocale} from '../plugins/i18n'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rememberMe: false,
    currentUser: null,
    language: defaultLocale
  },
  mutations: {
    setLanguage(state, lang: Locales) {
      state.language = lang;
    },
    setRememberMe(state, payload) {
      state.rememberMe = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;

      if (state.rememberMe)
        localStorage.setItem('currentUser', JSON.stringify(payload));
    },
    deleteUser(state) {
      state.currentUser = null;
      if (localStorage.getItem('currentUser'))
        localStorage.removeItem('currentUser');
    },
    initialiseStore(state) {
      if (localStorage.getItem('currentUser'))
        state.currentUser = JSON.parse(localStorage.getItem('currentUser') || "");
    }
  },
  actions: {
  },
  modules: {
  }
})
