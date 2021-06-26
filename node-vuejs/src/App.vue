<template>
  <div id="app">
    <header>
      <nav-menu />
    </header>
    <main>
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
  },
  beforeCreate() { this.$store.commit('initialiseStore');}
});
</script>
