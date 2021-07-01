<template>
  <div class="container box mt-6">
    <h2 class="title">{{ $t("consumer.commandes") }}</h2>
    <b-table :data="orders">
      <b-table-column field="restaurant" :label="$t('consumer.columns.restaurant')" v-slot="props">
        {{ props.row.restaurant.name }}
      </b-table-column>
      <b-table-column field="address" :label="$t('consumer.columns.address')" v-slot="props">
        {{ props.row.address }}
      </b-table-column>
      <b-table-column field="date" :label="$t('consumer.columns.date')" v-slot="props">
        {{ props.row.date }}
      </b-table-column>
      <b-table-column field="state" :label="$t('consumer.columns.state')" v-slot="props" width="150">
        <order-state :state="props.row.state"></order-state>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import consumerService from "../../../services/consumerService";
import OrderState from '../../../components/OrderState.vue';

export default Vue.extend({
  name: "order-history",
  components: {
    OrderState
  },
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
