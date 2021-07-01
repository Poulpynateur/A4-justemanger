<template>
  <div class="container box mt-6">
    <div v-if="$store.state.basket.length">
      <article-card
        v-for="article in $store.state.basket"
        :key="article.id"
        :article="article"
        type="basket"
      ></article-card>
      <b-field label="Addresse de livraison">
            <b-input v-model="address"></b-input>
        </b-field>
      <b-button type="is-primary" expanded @click="sendCommand()">{{
        $t("consumer.command")
      }}</b-button>
    </div>
    <div v-else>
      <section class="hero">
        <div class="hero-body">
          <p class="title">{{$t('consumer.basketEmpty')}}</p>
          <p class="subtitle">{{$t('consumer.basketEmptyDisclaimer')}}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleCard from "../../../components/consumer/ArticleCard.vue";
import consumerService from "../../../services/consumerService";

export default Vue.extend({
  name: "order-basket",
  components: {
    ArticleCard,
  },
  data() {
    return {
      address: ""
    }
  },
  methods: {
    sendCommand() {
      consumerService
        .orderFromBasket(this.address)
        .then(() => {
          this.$store.commit('deleteBasket');
          this.$router.push({name: 'order-progress'});
        })
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
