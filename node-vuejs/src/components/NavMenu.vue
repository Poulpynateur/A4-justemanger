<template>
  <header class="navbar">
    <section class="navbar-section">
      <a class="navbar-brand text-bold mr-2">{{ $appName }}</a>
    </section>
    <section class="navbar-center">
      <!-- centered logo or brand -->
    </section>
    <section class="navbar-section">
      <a class="btn btn-link">{{ $t("auth.login") }}</a>
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
  },
};
</script>
