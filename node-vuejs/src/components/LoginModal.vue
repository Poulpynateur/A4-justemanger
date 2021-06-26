<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("auth.login") }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field
          :label="$t('auth.username')"
          :type="errors.username ? 'is-danger' : ''"
          :message="errors.username"
        >
          <b-input
            type="text"
            v-model="loginForm.username"
            :placeholder="$t('auth.username')"
            required
          >
          </b-input>
        </b-field>

        <b-field
          :label="$t('auth.password')"
          :type="errors.password ? 'is-danger' : ''"
          :message="errors.password"
        >
          <b-input
            type="password"
            v-model="loginForm.password"
            password-reveal
            :placeholder="$t('auth.password')"
            required
          >
          </b-input>
        </b-field>

        <b-checkbox v-model="loginForm.remember">{{ $t("auth.rememberMe") }}</b-checkbox>

        <hr class="mt-4 mb-2" />

        <div class="columns is-vcentered is-gapless">
          <div class="column has-text-right">
            <p>{{ $t("auth.wannaRegister") }}</p>
          </div>
          <div class="column">
            <b-button @click="openRegisterModal" type="is-ghost">{{
              $t("auth.registerLink")
            }}</b-button>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button
          :label="$t('auth.login')"
          @click="sendLogin"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>


<script lang="ts">
import Vue from "vue";
import RegisterModal from "./RegisterModal.vue";
import authService from "../services/authService";

export default Vue.extend({
  name: "login-modal",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        remember: false
      },
      errors: {
        username: "",
        password: ""
      },
    };
  },
  methods: {
    openRegisterModal: function () {
      this.$emit("close");
      this.$buefy.modal.open({
        parent: this,
        component: RegisterModal,
        hasModalCard: true,
        trapFocus: true,
      });
    },
    sendLogin: function () {
      authService
        .login(this.loginForm.username, this.loginForm.password, this.loginForm.remember)
        .then(() => {
          this.$emit("close");
        })
        .catch((error) => {
          this.errors.username = this.$t("auth.error.username");
          this.errors.password = this.$t("auth.error.password");
        });
    },
  },
});
</script>
