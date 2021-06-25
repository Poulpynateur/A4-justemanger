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
      @change="info($event)"
    >
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <b-image
          class="max-height-100"
          :src="carousel.src"
          :alt="carousel.alt"
        ></b-image>
      </b-carousel-item>
    </b-carousel>
    <section class="container mt-6">
      <article class="media" v-for="i in media" :key="i">
        <figure class="media-left">
          <p class="image is-64x64">
            <b-skeleton circle width="64px" height="64px"></b-skeleton>
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <b-skeleton active></b-skeleton>
              <b-skeleton height="80px"></b-skeleton>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <b-skeleton></b-skeleton>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </section>
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
      media: 3,
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
