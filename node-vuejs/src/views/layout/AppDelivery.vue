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
              {{ active.customer.firstName + " " + active.customer.lastName }}
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
                <b-button type="is-danger" @click="abortDelivery()">{{
                  $t("delivery.abort")
                }}</b-button>
                <b-button type="is-success" @click="finishDelivery()">{{
                  $t("delivery.finish")
                }}</b-button>
              </div>
            </div>
          </footer>
        </div>
      </b-tab-item>

      <b-tab-item :label="$t('delivery.availables')">
        <b-table :data="availables">
          <b-table-column
            field="restaurant"
            :label="$t('delivery.columns.restaurant')"
            v-slot="props"
          >
            {{
              props.row.restaurant.name + " - " + props.row.restaurant.address
            }}
          </b-table-column>
          <b-table-column
            field="customer"
            :label="$t('delivery.columns.customer')"
            v-slot="props"
          >
            {{
              props.row.customer.firstName + " " + props.row.customer.lastName
            }}
          </b-table-column>
          <b-table-column
            field="address"
            :label="$t('delivery.columns.address')"
            v-slot="props"
          >
            {{ props.row.address }}
          </b-table-column>
          <b-table-column
            field="date"
            :label="$t('delivery.columns.date')"
            v-slot="props"
          >
            {{ props.row.date }}
          </b-table-column>
          <b-table-column v-slot="props" width="100">
            <b-button
              type="is-success"
              @click="acceptSelectedOrder(props.row.id)"
              >{{ $t("delivery.accept") }}</b-button
            >
          </b-table-column>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import deliveryService from "../../services/deliveryService";
import orderService from "../../services/orderService";

export default Vue.extend({
  name: "app-delivery",
  data() {
    return {
      activeTab: 0,
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
    acceptSelectedOrder(orderId: string) {
      deliveryService.acceptOrder(orderId).then((order) => {
        this.active = order;
        this.activeTab = 0;
      });
    },
    abortDelivery() {
      deliveryService.abortOrder(this.active.id).then((order) => {
        this.active = null;
        this.activeTab = 1;
        deliveryService.getAvailableOrders().then((availables) => {
          this.availables = availables;
        });
      });
    },
    finishDelivery() {
      deliveryService.finishOrder(this.active.id).then((order) => {
        this.active = null;
        this.activeTab = 1;
      });
    },
    createdOrder(data) {
      if (data == "restaurant.finished") {
        this.$notification.show(
          "JusteManger",
          {
            body: "Une nouvelle commande vient d'être ajouté à la liste!",
          },
          {}
        );
        deliveryService.getAvailableOrders().then((availables) => {
          this.availables = availables;
        });
      }
    },
  },
  created() {
    deliveryService.getActiveOrder().then((active) => {
      this.active = active;
    });
    deliveryService.getAvailableOrders().then((availables) => {
      this.availables = availables;
    });
    orderService.subscribeOrderCreateEvent((data) => {
      this.createdOrder(data);
    });
  },
});
</script>