<template>
  <div class="columns mt-3">
    <div class="column col-8 col-mx-auto">
      <form class="form-horizontal" :class="{'has-error': wrongCredentials}" @submit.prevent>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-example-1">{{
              $t("auth.username")
            }}</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              type="text"
              id="username"
              name="username"
              v-model="loginForm.username"
              :placeholder="$t('auth.username')"
            />
          </div>
        </div>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for="input-example-1">{{
              $t("auth.password")
            }}</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              class="form-input"
              type="password"
              id="password"
              name="password"
              v-model="loginForm.password"
              :placeholder="$t('auth.password')"
            />
          </div>
        </div>
        <button class="btn btn-primary float-right" @click="sendForm">{{$t('auth.login')}}</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import authService from "../services/authService";

export default {
  name: "app-auth",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      wrongCredentials: false
    };
  },
  methods: {
    sendForm: function() {
      authService.login(this.loginForm.username, this.loginForm.password).then(() => {
        this.wrongCredentials = false;
        this.$router.push('/');
      }).catch(() => {
        this.wrongCredentials = true;
      });
    }
  }
};
</script>
