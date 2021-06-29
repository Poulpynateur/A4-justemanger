<template>
  <div class="container box mt-6">
    <b-field grouped>
      <b-field expanded>
        <b-input
          v-model="filter.location"
          :placeholder="$t('consumer.search.location')"
          type="search"
          icon="magnify"
        >
        </b-input>
      </b-field>
      <b-field>
        <b-input
          v-model="filter.category"
          :placeholder="$t('consumer.search.categorie')"
          type="search"
        >
        </b-input>
      </b-field>
    </b-field>
    <hr />

    <section class="hero" v-if="!filteredRestaurant.length">
      <div class="hero-body">
        <p class="title">{{$t('consumer.search.noResult')}}</p>
        <p class="subtitle">{{$t('consumer.search.noResultHint')}}</p>
      </div>
    </section>
    <div v-else class="columns">
      <section
        class="column is-3"
        v-for="(item, index) in filteredRestaurant"
        :key="index"
      >
        <restaurant-card :index="index" :restaurant="item"></restaurant-card>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RestaurantCard from "../../components/consumer/RestaurantCard.vue";
import restaurantService from "../../services/restaurantService";
import consumerService from "../../services/consumerService";

export default Vue.extend({
  name: "app-consumer",
  components: {
    RestaurantCard,
  },
  data() {
    return {
      restaurants: [],
      filter: {
        location: "",
        category: "",
      },
    };
  },
  computed: {
    filteredRestaurant() {
      let filtered = this.restaurants;

      if (this.filter.location)
        filtered = filtered.filter((restaurant) =>
          consumerService.filterContain(
            restaurant.address,
            this.filter.location
          )
        );

      if (this.filter.category)
        filtered = filtered.filter((restaurant) =>
          consumerService.filterContain(
            restaurant.category,
            this.filter.category
          )
        );

      return filtered;
    },
  },
  created() {
    restaurantService.getAll().then((restaurants) => {
      this.restaurants = restaurants;
    });
  },
});
</script>
