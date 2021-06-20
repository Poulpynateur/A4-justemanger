<template>
<header class="navbar">
  <section class="navbar-section">
    <a class="navbar-brand text-bold mr-2">{{ $appName }}</a>
  </section>
  <section class="navbar-center">
    <!-- centered logo or brand -->
  </section>
  <section class="navbar-section">
    <a href="#" class="btn btn-link">Twitter</a>
    <a href="#" class="btn btn-link">GitHub</a>
  </section>
</header>
</template>

<script lang="ts">
export default {
  name: 'nav-menu'
}
</script>
