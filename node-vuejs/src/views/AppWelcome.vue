<template>
  <div class="hero is-halfheight">
    <div class="hero-body">
      <div class="">
        <h1 class="title">{{ $t("welcome") }}</h1>
        <p class="subtitle">
          {{ $t("welcomeSubtitle") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app-welcome",
});
</script>
