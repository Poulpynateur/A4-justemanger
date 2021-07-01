<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <nav-menu />
      </header>
      <main>
        <router-view />
      </main>
    </div>
    <footer class="footer mt-6">
      <div class="content has-text-centered">
        <span>
          <a href="https://twitter.com/?lang=en">Twitter</a>
          <a class="ml-3" href="https://www.facebook.com/">Facebook</a>
          <a class="ml-3" href="https://fr.wiktionary.org/wiki/R.I.P."
            >Google +</a
          >
        </span>
        <p class="has-text-grey-lighter">
          <strong class="has-text-grey-lighter">A4 project</strong> created by
          myself. The source code can be found at
          <a
            class="has-text-grey-lighter"
            href="https://github.com/Poulpynateur/A4-justemanger"
            >MIT</a
          >. The website content is licensed by nothing.
        </p>
        <rick-roll></rick-roll>
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
//@ts-nocheck
import Vue from "vue";
import NavMenu from "./components/NavMenu.vue";
import RickRoll from "rickspower/RickRoll.vue";

export default Vue.extend({
  name: "app",
  components: {
    NavMenu,
    RickRoll
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});
</script>
