<template>
  <section class="navbar-wrapper white-back">
    <b-navbar class="container transparent" :transparent="true">
      <template #brand>
        <b-navbar-item class="p-0" tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/images/logo - large.png" class="image logo" />
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <a
            v-if="!isConnected"
            class="button is-light"
            @click="openLoginModal"
            >{{ $t("auth.login") + " / " + $t("auth.register") }}</a
          >
          <b-navbar-dropdown v-else :arrowless="true" :label="$t('account')">
            <b-navbar-item>
              <router-link :to="{ name: 'user-profile' }">{{
                getUserFullName
              }}</router-link>
            </b-navbar-item>
            <b-navbar-item href="#" @click="disconnect()">{{
              $t("action.disconnect")
            }}</b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-navbar-dropdown label="Lang">
            <b-navbar-item
              href="#"
              v-for="(lang, i) in langs"
              :key="i"
              @click="changLang(lang.value)"
            >
              {{ lang.caption }}
            </b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<style scoped>
.logo {
  max-height: 3rem;
}
.transparent {
  background-color: transparent;
}
.navbar-wrapper {
  position: fixed;
  z-index: 10;
  width: 100%;
}
.white-back {
  background-color: white;
  box-shadow: 0 5px 5px white;
}
</style>

<script lang="ts">
import Vue from "vue";

import { LOCALES } from "../plugins/i18n";
import authService from "../services/authService";
import LoginModal from "./LoginModal.vue";

export default Vue.extend({
  name: "nav-menu",
  data() {
    return {
      langs: LOCALES,
      onTop: true,
    };
  },
  methods: {
    changLang: function (lang: string) {
      this.$i18n.locale = lang;
      this.$store.commit("setLanguage", lang);
    },
    disconnect: function () {
      authService.disconnect();
      this.$router.push({ name: "home" });
    },
    openLoginModal: function () {
      this.$buefy.modal.open({
        parent: this,
        component: LoginModal,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    onScroll: function () {
      this.onTop = window.top.scrollY == 0;
    },
  },
  computed: {
    isConnected: function (): boolean {
      return !!this.$store.state.currentUser;
    },
    getUserFullName: function (): string {
      return (
        this.$store.state.currentUser.firstName +
        " " +
        this.$store.state.currentUser.lastName
      );
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
});
</script>
