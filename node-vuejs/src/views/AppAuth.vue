<template>
  <section class="columns is-centered is-desktop">
    <div class="column is-half">
    <b-field label="Username" :type="{ 'is-danger': hasError }">
      <b-input v-model="loginForm.username" maxlength="30"></b-input>
    </b-field>

    <b-field label="Password" :type="{ 'is-danger': hasError }">
      <b-input
        v-model="loginForm.password"
        type="password"
        maxlength="30"
      ></b-input>
    </b-field>
    <b-button type="is-primary" @click="sendForm">{{$t('auth.login')}}</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import authService from "../services/authService";

export default Vue.extend({
  name: "app-auth",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      hasError: false,
    };
  },
  methods: {
    sendForm: function () {
      authService
        .login(this.loginForm.username, this.loginForm.password)
        .then(() => {
          this.hasError = false;
          this.$router.push("/");
        })
        .catch(() => {
          this.hasError = true;
        });
    },
  },
});
</script>
