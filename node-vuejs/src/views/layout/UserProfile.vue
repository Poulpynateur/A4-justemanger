<template>
  <div class="container box mt-6">
    <form action="">
      <b-field
        :label="$t('auth.username')"
        :type="errors.username ? 'is-danger' : ''"
        :message="errors.username"
      >
        <b-input
          type="text"
          v-model="user.username"
          :placeholder="$t('auth.username')"
          required
        >
        </b-input>
      </b-field>

      <b-field
        :label="$t('form.email')"
        :type="errors.email ? 'is-danger' : ''"
        :message="errors.email"
      >
        <b-input v-model="user.email" type="email" required> </b-input>
      </b-field>

      <b-field grouped>
        <b-field
          :label="$t('form.firstName')"
          :type="errors.firstName ? 'is-danger' : ''"
          :message="errors.firstName"
          expanded
        >
          <b-input
            v-model="user.firstName"
            :placeholder="$t('form.firstName')"
            required
          ></b-input>
        </b-field>
        <b-field
          :label="$t('form.lastName')"
          :type="errors.lastName ? 'is-danger' : ''"
          :message="errors.lastName"
          expanded
        >
          <b-input
            v-model="user.lastName"
            :placeholder="$t('form.lastName')"
            required
          ></b-input>
        </b-field>
      </b-field>

      <div class="buttons">
        <b-button
          :label="$t('action.update')"
          @click="updateUserInfos()"
          type="is-primary"
        />
        <b-button
          :label="$t('auth.deleteAccount')"
          @click="deleteAccount()"
          type="is-danger"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import userService from "../../services/userService";

export default Vue.extend({
  name: "user-profile",
  data() {
    return {
      user: this.$store.state.currentUser,
      errors: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
      },
    };
  },
  methods: {
    updateUserInfos() {
      userService
        .updateUserInfo(this.user)
        .then(() => {
          this.$buefy.toast.open({
            message: this.$t("action.success"),
            type: "is-success",
          });
        })
        .catch((data) => {
          // Reset messages
          for (const err in this.errors) {
            this.errors[err] = "";
          }

          if (data.errors) {
            data.errors.forEach((element) => {
              this.errors[element.param] = this.$t(
                "form.error." + element.param
              );
            });
          }
        });
    },
    deleteAccount() {
      this.$buefy.dialog.confirm({
        message: this.$t("auth.deleteAccountDisclaimer"),
        onConfirm: () => {
          userService
            .deleteUser(this.user.id)
            .then(() => {
              this.$buefy.toast.open({
                message: this.$t("action.success"),
                type: "is-success",
              });
              this.$router.push({name: 'home'});
            })
            .catch((error) => {
              this.$buefy.toast.open({
                message: this.$t("action.failed"),
                type: "is-danger",
              });
            });
        },
      });
    },
  },
});
</script>
