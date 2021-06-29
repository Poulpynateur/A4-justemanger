<template>
  <div class="container box mt-6">
    <article-card
      v-for="article in $store.state.basket"
      :key="article.id"
      :article="article"
      type="basket"
    ></article-card>

    <b-button type="is-primary" expanded>{{ $t("consumer.command") }}</b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleCard from "../../components/consumer/ArticleCard.vue";
import consumerService from "../../services/consumerService";

export default Vue.extend({
  name: "order-basket",
  components: {
    ArticleCard,
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
});
</script>
