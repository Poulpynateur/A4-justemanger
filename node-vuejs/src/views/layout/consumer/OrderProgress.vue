<template>
  <div class="container box mt-6">
    <b-steps v-model="step" :has-navigation="false" class="my-6">
        <b-step-item :label="$t('consumer.progress.steps.1')" icon="cookie">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.preparing')}}</h1>
        </b-step-item>
        <b-step-item :label="$t('consumer.progress.steps.2')" icon="fire">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.waiting')}}</h1>
        </b-step-item>
        <b-step-item :label="$t('consumer.progress.steps.3')" icon="moped">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.delivering')}}</h1>
        </b-step-item>
        <b-step-item :label="$t('consumer.progress.steps.4')" icon="account-check">
          <h1 class="title has-text-centered">{{$t('consumer.progress.disclaimers.delivered')}}</h1>
        </b-step-item>
    </b-steps>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import orderService from '../../../services/orderService';

export default Vue.extend({
  name: "order-progress",
  data() {
    return {
      step: 0
    }
  },
  methods: {
    setStep(state: string) {
      if (state == 'restaurant.finished') {
        this.step = 1;
        this.$notification.show(
          "JusteManger",
          {
            body: "Votre commande vient d'être préparer par le restaurant !",
          },
          {}
        );
      }
      else if (state == 'delivery.progress') {
        this.step = 2;
        this.$notification.show(
          "JusteManger",
          {
            body: "Votre commande vient d'être prise en charge par le livreur !",
          },
          {}
        );
      }
      else if (state == 'delivery.end') {
        this.step = 3;
        this.$notification.show(
          "JusteManger",
          {
            body: "Vous commande à été livrée !",
          },
          {}
        );
      }
    }
  },
  mounted() {
      orderService.consumerOrderEvent(this.setStep);
  }
});
</script>
