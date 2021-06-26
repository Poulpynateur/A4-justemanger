import Vue from 'vue'
import Vuex from 'vuex'

import {Locales, defaultLocale} from '../plugins/i18n'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    language: defaultLocale
  },
  mutations: {
    setLanguage(state, lang: Locales) {
      state.language = lang;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload.user;

      if (payload.remember)
        localStorage.setItem('currentUser', JSON.stringify(payload.user));
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
