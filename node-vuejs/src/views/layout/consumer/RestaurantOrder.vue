<template>
  <div class="container box mt-6" v-if="restaurant">
    <h2 class="title">{{ $t("restorer.menus") }}</h2>
    <section class="columns">
      <div class="column is-3">
        <article-card
          v-for="menu in restaurant.menus"
          :key="menu.id"
          :article="menu"
          :restaurant="restaurant"
        ></article-card>
      </div>
    </section>
    <h2 class="title">{{ $t("restorer.articles") }}</h2>
    <section class="columns">
      <div class="column is-3">
        <article-card
          v-for="article in restaurant.articles"
          :key="article.id"
          :article="article"
          :restaurant="restaurant"
        ></article-card>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleCard from "../../../components/consumer/ArticleCard.vue";
import restaurantArticle from "../../../services/restaurantService";

export default Vue.extend({
  name: "restaurant-order",
  props: ["restaurantId"],
  components: {
    ArticleCard,
  },
  data() {
    return {
      restaurant: null,
    };
  },
  created() {
    restaurantArticle.getFromId(this.restaurantId).then((restaurant) => {
      this.restaurant = restaurant;
    });
  },
});
</script>
