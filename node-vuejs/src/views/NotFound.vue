<template>
  <div class="container">
    <div class="hero is-halfheight">
      <div class="hero-body">
        <div class="">
          <h1 class="title is-size-1">404</h1>
          <p class="subtitle is-size-2">
            {{ $t("errors.404") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "not-found",
});
</script>
