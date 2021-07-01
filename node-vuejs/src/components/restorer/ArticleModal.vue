<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalType }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">

        <b-field :label="$t('restorer.columns.articles.name')">
          <b-input
            type="text"
            v-model="article.name"
            :placeholder="$t('restorer.columns.articles.name')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.columns.articles.price')">
          <b-input
            type="text"
            v-model="article.price"
            :placeholder="$t('restorer.columns.articles.price')"
            required
          >
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button :label="modalType" @click="createNewArticle()" type="is-primary" />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import {ArticleDTO} from "../../store/models/restaurant";

export default Vue.extend({
  name: "article-modal",
  props: {
    modalType: {type: String},
    article: {type: Object, default: () => new ArticleDTO()}
  },
  methods: {
      createNewArticle() {
          this.$emit('modalFinished', this.article);
          this.$emit('close');
      }
  }
});
</script>
