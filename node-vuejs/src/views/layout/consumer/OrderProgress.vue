<template>
  <div class="container box mt-6">
    <b-steps v-model="step" :has-navigation="false" class="my-6">
        <b-step-item :label="$t('consumer.progress.steps.1')" icon="cookie">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.preparing')}}</h1>
        </b-step-item>
        <b-step-item :label="$t('consumer.progress.steps.2')" icon="moped">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.delivering')}}</h1>
        </b-step-item>
        <b-step-item :label="$t('consumer.progress.steps.3')" icon="account-check">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.delivered')}}</h1>
        </b-step-item>
    </b-steps>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import consumerService from '../../../services/consumerService';

export default Vue.extend({
  name: "order-progress",
  data() {
    return {
      step: 0
    }
  },
  methods: {
    setStep(state: string) {
      if (state == 'delivery.progress') this.step = 1;
      if (state == 'delivery.end') this.step = 2;
    }
  },
  mounted() {
      consumerService.subscribeOrderUpdateEvent(this.setStep);
  }
});
</script>
