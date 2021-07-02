<template>
  <div>
    <app-welcome v-if="!isConnected()"></app-welcome>
    <app-external-dev v-else-if="haveRole('admin') || haveRole('developper')"></app-external-dev>
    <app-consumer v-else-if="haveRole('enduser.consumer')"></app-consumer>
    <app-delivery v-else-if="haveRole('enduser.delivery')"></app-delivery>
    <app-restorer v-else-if="haveRole('enduser.restorer')"></app-restorer>
  </div>
</template>

<style lang="scss" scoped>
.max-height-100 {
  max-height: 100vh;
}
</style>

<script lang="ts">
import Vue from "vue";
import LoginModal from "../components/LoginModal.vue";

import AppWelcome from "./layout/AppWelcome.vue";
import AppExternalDev from "./layout/AppExternalDev.vue";
import AppConsumer from "./layout/AppConsumer.vue";
import AppDelivery from "./layout/AppDelivery.vue";
import AppRestorer from "./layout/AppRestorer.vue";

export default Vue.extend({
  name: "app-main",
  props: ["login"],
  components: {
    AppWelcome,
    AppConsumer,
    AppDelivery,
    AppRestorer,
    AppExternalDev
  },
  data() {
    return {
    }
  },
  methods: {
    isConnected() {
      return !!this.$store.state.currentUser;
    },
    haveRole(role: string) {
      if (!this.$store.state.currentUser) return false;
      return this.$store.state.currentUser.role == role;
    }
  },
  mounted() {
    if (this.$route.query.login) {
      this.$router.replace({'login': null});
      this.$buefy.modal.open({
        parent: this,
        component: LoginModal,
        hasModalCard: true,
        trapFocus: true,
      });
    }
  },
});
</script>
