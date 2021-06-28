<template>
  <div>
    <b-carousel
      v-model="carousel"
      :animated="animated"
      :has-drag="drag"
      :autoplay="autoPlay"
      :pause-hover="pauseHover"
      :pause-info="pauseInfo"
      :pause-info-type="pauseType"
      :interval="interval"
      :repeat="repeat"
    >
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <b-image
          class="max-height-100"
          :src="carousel.src"
          :alt="carousel.alt"
        ></b-image>
      </b-carousel-item>
    </b-carousel>

    <div class="container box mt-6">
      <section class="hero">
        <div class="hero-body">
          <p class="title">Lorem ipsum dolor sit amet</p>
          <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.max-height-100 {
  max-height: 100vh;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app-welcome",
  data() {
    return {
      carousel: 0,
      animated: "fade",
      drag: false,
      autoPlay: true,
      pauseHover: false,
      pauseInfo: false,
      repeat: true,
      pauseType: "is-primary",
      interval: 10000,
      carousels: [
        {
          src: require("@/assets/images/carousel - 0.jpg"),
          alt: "Probably some chicken, idk.",
        },
        {
          src: require("@/assets/images/carousel - 1.jpg"),
          alt: "Healthy things.",
        },
        {
          src: require("@/assets/images/carousel - 2.jpg"),
          alt: "Lemon chicken, I think ?",
        },
      ],
    };
  },
});
</script>
