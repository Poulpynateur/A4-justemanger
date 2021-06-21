<template>
  <b-navbar class="container">
    <template #brand>
      <b-navbar-item class="p-0" tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/images/logo - large.png" class="image" />
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <b-navbar-dropdown :label="$i18n.locale">
          <b-navbar-item href="#" v-for="(lang, i) in langs" :key="i" @click="changLang(lang.value)">
            {{lang.caption}}
          </b-navbar-item>
        </b-navbar-dropdown>
        <div v-if="!isConnected" class="buttons">
          <a class="button is-primary">
            <router-link to="/register">
              <strong>{{ $t('auth.register') }}</strong>
            </router-link>
          </a>
          <a class="button is-light">
            <router-link to="/login">{{ $t('auth.login') }}</router-link>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";

import { LOCALES } from "../plugins/i18n";
import authService from "../services/authService";

export default Vue.extend({
  name: "nav-menu",
  data() {
    return {
      langs: LOCALES,
    };
  },
  methods: {
    changLang: function (lang: string) {
      this.$i18n.locale = lang;
      this.$store.commit("setLanguage", lang);
    },
    disconnect: function () {
      authService.disconnect();
    },
  },
  computed: {
    isConnected: function (): boolean {
      return !!this.$store.state.currentUser;
    },
  },
});
</script>
