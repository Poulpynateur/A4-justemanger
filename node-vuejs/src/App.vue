<template>
  <div id="app" class="container">
    <header>
      <nav-menu />
    </header>
    <main class="px-2">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

@import "@/assets/scss/styles.scss";

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<script lang="ts">
import Vue from 'vue';
import NavMenu from './components/NavMenu.vue'

export default Vue.extend({
  name: 'app',
  components: {
    NavMenu
  }
});
</script>
