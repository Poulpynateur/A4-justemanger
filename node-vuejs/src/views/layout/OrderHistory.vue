<template>
  <div class="container box mt-6">
    <h2 class="title">{{ $t("consumer.commandes") }}</h2>
    <b-table
            :data="orders"
            :columns="columns"
          ></b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import consumerService from "../../services/consumerService";

export default Vue.extend({
  name: "order-history",
  components: {},
  data() {
    return {
      orders: [],
      columns: [
          {
            field: "restaurant",
            label: this.$t("consumer.columns.restaurant"),
          },
          {
            field: "address",
            label: this.$t("consumer.columns.address"),
          },
          {
            field: "date",
            label: this.$t("consumer.columns.date"),
          },
          {
            field: "state",
            label: this.$t("consumer.columns.state"),
          },
        ],
    };
  },
  methods: {
    sendCommand() {
      consumerService
        .orderFromBasket()
        .then(() => {})
        .catch((error) => {
          this.$buefy.toast.open({
            message: this.$t("action.failed"),
            type: "is-danger",
          });
        });
    },
  },
  created() {
    consumerService
      .getUserOrders()
      .then((orders) => {
        this.orders = orders;
      })
      .catch((error) => {
        this.$buefy.toast.open({
          message: this.$t("action.failed"),
          type: "is-danger",
        });
      });
  },
});
</script>
