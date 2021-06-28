<template>
  <div id="app">
    <header>
      <nav-menu />
    </header>
    <main style="padding-top: 3.6rem">
      <router-view />
    </main>

    <footer class="footer mt-6">
      <div class="content has-text-centered">
        <span>
          <a href="https://twitter.com/?lang=en">Twitter</a>
          <a class="ml-3" href="https://www.facebook.com/">Facebook</a>
          <a class="ml-3" href="https://fr.wiktionary.org/wiki/R.I.P.">Google +</a>
        </span>
        <p class="has-text-grey-lighter">
          <strong class="has-text-grey-lighter">A4 project</strong> created by myself. The source code can be found at <a class="has-text-grey-lighter" href="https://github.com/Poulpynateur/A4-justemanger">MIT</a>. The
          website content is licensed by nothing.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

@import "@/assets/scss/styles.scss";

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<script lang="ts">
import Vue from "vue";
import NavMenu from "./components/NavMenu.vue";

export default Vue.extend({
  name: "app",
  components: {
    NavMenu,
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});
</script>
