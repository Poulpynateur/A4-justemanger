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
      <b-carousel-item class="relative" v-for="(carousel, i) in carousels" :key="i">
        <b-image
          class="max-height-100"
          :src="carousel"
          alt="Placeholder image"
        ></b-image>
        <h1 class="title is-1 has-text-light">{{$t('welcome')}}</h1>
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
.relative {
  position: relative;

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
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
        'http://lorempixel.com/1920/1080/food/1',
        'http://lorempixel.com/1920/1080/food/2',
        'http://lorempixel.com/1920/1080/food/3'
      ],
    };
  },
});
</script>
