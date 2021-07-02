<template>
  <div class="container box mt-6">
    <h1 class="title">{{$t('externalDev.component')}}</h1>
    <a href="https://www.npmjs.com/package/rickspower">{{$t('externalDev.npm')}}</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app-external-dev",
});
</script>