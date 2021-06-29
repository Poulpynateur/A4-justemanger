<template>
  <div class="container box mt-6">
    <b-tabs v-model="activeTab">
      <b-tab-item :label="$t('delivery.accepted')">
        <section class="hero" v-if="!active">
          <div class="hero-body">
            <p class="title">{{ $t("delivery.noAccepted") }}</p>
            <p class="subtitle">{{ $t("delivery.noAcceptedDisclaimer") }}</p>
          </div>
        </section>
        <div class="card" v-else>
          <header class="card-header">
            <p class="card-header-title">
              {{ active.customer }}
            </p>
          </header>
          <div class="card-content">
            <p class="title">
              {{ active.address }}
            </p>
            <p class="subtitle">{{ active.date }}</p>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <div class="buttons">
                <b-button type="is-danger">{{ $t("delivery.abort") }}</b-button>
                <b-button type="is-success">{{
                  $t("delivery.finish")
                }}</b-button>
              </div>
            </div>
          </footer>
        </div>
      </b-tab-item>

      <b-tab-item :label="$t('delivery.availables')">
        <b-button
          type="is-primary"
          expanded
          :disabled="!selected"
          @click="acceptSelectedOrder()"
          >{{ $t("delivery.accept") }}</b-button
        >
        <b-table
          :data="availables"
          :columns="availablesCols"
          :selected.sync="selected"
        ></b-table>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import deliveryService from "../../services/deliveryService";

export default Vue.extend({
  name: "app-delivery",
  data() {
    return {
      activeTab: 0,
      selected: null,
      availables: [],
      availablesCols: [
        { field: "restaurant", label: this.$t("delivery.columns.restaurant") },
        { field: "customer", label: this.$t("delivery.columns.customer") },
        { field: "address", label: this.$t("delivery.columns.address") },
        { field: "date", label: this.$t("delivery.columns.date") },
      ],
      active: null,
    };
  },
  methods: {
    acceptSelectedOrder() {
      deliveryService.acceptOrder(this.selected).then((order) => {
        this.active = order;
        this.selected = null;
        this.activeTab = 0;
      });
    },
  },
  created() {
    deliveryService.getActiveOrder().then((active) => {
      this.active = active;
    });
    deliveryService.getAvailableOrders().then((availables) => {
      this.availables = availables;
    });
  },
});
</script>