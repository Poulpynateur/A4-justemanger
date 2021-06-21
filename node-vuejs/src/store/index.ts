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
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    deleteUser(state) {
      state.currentUser = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
