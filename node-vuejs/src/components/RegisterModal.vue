<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("auth.login") }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field :label="$t('auth.username')">
          <b-input
            type="text"
            :v-model="registerForm.username"
            :placeholder="$t('auth.username')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('auth.password')">
          <b-input
            type="password"
            :v-model="registerForm.password"
            password-reveal
            :placeholder="$t('auth.password')"
            required
          >
          </b-input>
        </b-field>

        <b-field grouped>
          <b-field :label="$t('form.firstName')" expanded>
            <b-input
              :v-model="registerForm.firstName"
              :placeholder="$t('form.firstName')"
              required
            ></b-input>
          </b-field>
          <b-field :label="$t('form.lastName')" expanded>
            <b-input
              :v-model="registerForm.lastName"
              :placeholder="$t('form.lastName')"
              required
            ></b-input>
          </b-field>
        </b-field>

        <b-field :label="$t('form.role')" :message="roleDisclaimer()">
          <b-select expanded v-model="registerForm.selectedRole">
            <option v-for="(item, index) in roles" :key="index" :value="item">
              {{ $t('roles.' + item) }}
            </option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button :label="$t('auth.register')" type="is-primary" />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "register-modal",
  data() {
    return {
      // TODO : fetch data from user service
      roles: [
        "enduser.consumer",
        "enduser.restorer",
        "enduser.delivery"
      ],
      registerForm: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "",
        selectedRole: "enduser.consumer"
      },
      hasError: false,
    };
  },
  methods: {
    roleDisclaimer: function() {
      if (this.registerForm.selectedRole != "enduser.consumer")
        return this.$t("form.roleDisclaimer");
      else return "";
    }
  }
});
</script>
