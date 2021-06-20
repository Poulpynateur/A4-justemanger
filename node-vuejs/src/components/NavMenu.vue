<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link to="/">
        <a class="navbar-brand text-bold mr-2">{{ $appName }}</a>
      </router-link>
    </section>
    <section class="navbar-center">
      <!-- centered logo or brand -->
    </section>
    <section class="navbar-section">

      <div v-if="isConnected" class="dropdown dropdown-right">
        <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
          <i class="icon icon-people mr-2"></i>{{ $store.state.currentUser.username }}
        </a>
        <!-- menu component -->
        <ul class="menu" style="min-width: 50px">
          <li class="divider"></li>
          <li class="menu-item">
            <a class="btn btn-link" @click="disconnect">{{ $t('auth.disconnect') }}</a>
          </li>
        </ul>
      </div>
      <router-link v-else to="/login">{{ $t("auth.login") }}</router-link>

      <div class="dropdown dropdown-right">
        <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
          {{ $i18n.locale }} <i class="icon icon-caret"></i>
        </a>
        <!-- menu component -->
        <ul class="menu" style="min-width: 50px">
          <li class="menu-item" v-for="(o, i) in langs" :key="i">
            <a class="btn btn-link" @click="changLang(o)">{{ o }}</a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script lang="ts">
import { Locales } from "../plugins/i18n";
import authService from "../services/authService";

export default {
  name: "nav-menu",
  data() {
    return {
      langs: Locales,
    };
  },
  methods: {
    changLang: function(lang) {
      this.$i18n.locale = lang;
    },
    disconnect: function() {
      authService.disconnect();
    }
  },
  computed: {
    isConnected: function() {
      return !!this.$store.state.currentUser;
    }
  }
};
</script>
