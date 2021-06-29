<template>
  <b-navbar :shadow="true" :transparent="true" centered fixed-top>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/images/logo - large.png" class="image logo" />
      </b-navbar-item>
    </template>
    <template #end>
    <b-navbar-item v-if="hasRole('enduser.consumer')" tag="div">
      <router-link  :to="{ name: 'basket' }"><b-button icon-right="basket"><b-tag class="mr-2" type="is-primary" rounded>{{$store.state.basket.length}}</b-tag>{{ $t('consumer.basket') }}</b-button></router-link>
    </b-navbar-item>
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
            <b-navbar-item v-if="hasRole('enduser.consumer')">
            <router-link :to="{ name: 'order-history' }">{{
              $t("consumer.commandes")
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
</template>

<style scoped>
.logo {
  max-height: 2.5rem;
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
    hasRole(role) {
      return this.$store.state.currentUser.role == role;
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
});
</script>
