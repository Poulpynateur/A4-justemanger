<template>
  <b-tag :type="getType()">{{ $t("order." + state) }}</b-tag>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "order-state",
  props: ["state"],
  methods: {
    getType() {
      if (
        this.state == "restaurant.pending" ||
        this.state == "delivery.progress"
      ) {
        return "is-success";
      }
        return "is-warning";
    },
  },
});
</script>
