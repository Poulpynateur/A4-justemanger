<template>
<article class="card">
  <div class="card-image">
    <figure class="image is-2by1">
      <img :src="'http://lorempixel.com/200/100/food/' + restaurant.id" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{restaurant.category}}</p>
      </div>
    </div>
    <div class="content">
      <router-link :to="{ name: 'restaurant', params: { restaurantId: restaurant.id } }"><p class="title">{{restaurant.name}}</p></router-link>
      <p class="subtitle">{{restaurant.address}}</p>
    </div>
  </div>
</article>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "restaurant-card",
  props: ['restaurant']
});
</script>
