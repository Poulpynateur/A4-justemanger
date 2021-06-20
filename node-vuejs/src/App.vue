<template>
  <div id="app" class="container">
    <nav-menu />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/sass/styles.scss";
</style>

<script lang="ts">
import NavMenu from './components/NavMenu.vue'

export default {
  name: 'app',
  components: {
    NavMenu
  }
}
</script>
