<template>
  <div id="app" class="container">
    <nav-menu />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/styles.scss";
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
