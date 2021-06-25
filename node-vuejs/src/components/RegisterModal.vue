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
            v-model="newUser.username"
            :placeholder="$t('auth.username')"
            required
            maxlength="30"
          >
          </b-input>
        </b-field>

        <b-field :label="$t('auth.password')">
          <b-input
            type="password"
            v-model="newUser.password"
            password-reveal
            :placeholder="$t('auth.password')"
            required
          >
          </b-input>
        </b-field>

        <b-field grouped>
          <b-field :label="$t('form.firstName')" expanded>
            <b-input
              v-model="newUser.firstName"
              :placeholder="$t('form.firstName')"
              required
            ></b-input>
          </b-field>
          <b-field :label="$t('form.lastName')" expanded>
            <b-input
              v-model="newUser.lastName"
              :placeholder="$t('form.lastName')"
              required
            ></b-input>
          </b-field>
        </b-field>

        <b-field :label="$t('form.role')" :message="roleDisclaimer">
          <b-select expanded v-model="newUser.role">
            <option v-for="(item, index) in roles" :key="index" :value="item">
              {{ $t("roles." + item) }}
            </option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button
          :label="$t('auth.register')"
          @click="sendNewUser()"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { UserDTO } from "../store/models/user";
import authService from "../services/authService";

export default Vue.extend({
  name: "register-modal",
  data() {
    return {
      // TODO : fetch data from user service
      roles: ["enduser.consumer", "enduser.restorer", "enduser.delivery"],
      newUser: {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "enduser.consumer",
      },
      hasError: false,
    };
  },
  created: function () {
    this.newUser.role = "enduser.consumer";
  },
  methods: {
    sendNewUser() {
      authService.register(this.newUser).then(() => {
        this.$emit("close");
      });
    }
  },
  computed: {
    roleDisclaimer: function () {
      if (this.newUser.role != "enduser.consumer")
        return this.$t("form.roleDisclaimer");
      else return "";
    }
  }
});
</script>
