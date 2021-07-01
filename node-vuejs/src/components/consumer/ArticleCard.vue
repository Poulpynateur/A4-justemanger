<template>
  <article class="card mb-2">
    <div class="card-image" v-if="type != 'basket'">
    <figure class="image is-2by1">
      <img :src="'http://lorempixel.com/200/100/food/' + article.id" alt="Placeholder image">
    </figure>
  </div>
    <div class="card-content">
      <div class="content">
        <p class="title">
        {{ article.name }}
      </p>
        <div v-if="article.subArticles">
          <b-tag v-for="sub in article.subArticles" :key="sub.id">{{
          sub.name
        }}</b-tag>
          </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        {{ $t("consumer.price") + " : " + article.price + " €" }}
      </p>
      <a class="card-footer-item" v-if="type == 'basket'">
        <b-button @click="deleteFromBasket(article)" type="is-danger">{{ $t("consumer.deleteBasket") }}</b-button>
      </a>
      <a class="card-footer-item" v-else>
        <b-button @click="addToBasket(article)">{{ $t("consumer.addBasket") }}</b-button>
      </a>
    </footer>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "article-card",
  props: ["article", "restaurant", "type"],
  methods: {
    addToBasket(article) {
      this.$store.commit("setBasketResto", this.restaurant);
      this.$store.commit("addToBasket", article);
      this.$buefy.toast.open({
        message: this.$t("consumer.addedSuccess"),
        type: "is-success",
      });
    },
    deleteFromBasket(article) {
      this.$store.commit("removeFromBasket", article);
      this.$buefy.toast.open({
        message: this.$t("consumer.removeSuccess"),
        type: "is-success",
      });
    },
  },
});
</script>
