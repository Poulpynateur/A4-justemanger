<template>
  <div class="container box mt-6">
    <b-tabs>
      <b-tab-item :label="$t('delivery.accepted')">
        <section class="hero" v-if="!accepted">
          <div class="hero-body">
            <p class="title">{{ $t('delivery.noAccepted')}}</p>
            <p class="subtitle">{{ $t('delivery.noAcceptedDisclaimer')}}</p>
          </div>
        </section>
        <div v-else></div>
      </b-tab-item>

      <b-tab-item :label="$t('delivery.availables')">
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "app-delivery",
  data() {
    return {
      availables: [],
      accepted: null,
    };
  },
});
</script>
