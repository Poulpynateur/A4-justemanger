<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> {{ $t('restorer.createArticle') }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">

        <b-field :label="$t('restorer.columns.articles.name')">
          <b-input
            type="text"
            v-model="newArticle.name"
            :placeholder="$t('restorer.columns.articles.name')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.columns.articles.price')">
          <b-input
            type="text"
            v-model="newArticle.price"
            :placeholder="$t('restorer.columns.articles.price')"
            required
          >
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button :label="$t('action.create')" @click="createNewArticle()" type="is-primary" />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import {ArticleDTO} from "../store/models/restaurant";

export default Vue.extend({
  name: "article-modal",
  data() {
      return {
          newArticle: new ArticleDTO()
      }
  },
  methods: {
      createNewArticle() {
          this.$emit('articleCreated', this.newArticle);
          this.$emit('close');
      }
  }
});
</script>
