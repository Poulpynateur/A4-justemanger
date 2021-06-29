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
            v-model="menu.name"
            :placeholder="$t('restorer.columns.articles.name')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.columns.articles.price')">
          <b-input
            type="text"
            v-model="menu.price"
            :placeholder="$t('restorer.columns.articles.price')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.articles')">
          <b-table
            :data="articles"
            :columns="articlesCols"
            :checked-rows.sync="menu.subArticles"
            checkable
            :checkbox-position="'left'"
          >
            <template #bottom-left>
              <b>{{ $t("restorer.totalChecked") }}</b
              >: {{ menu.subArticles.length }}
            </template>
          </b-table>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button
          :label="modalType"
          @click="createNewMenu()"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { ArticleDTO } from "../../store/models/restaurant";

export default Vue.extend({
  name: "menu-modal",
  props: {
    modalType: { type: String },
    menu: {
      type: ArticleDTO,
      default: () => new ArticleDTO(),
    },
    articles: {},
    articlesCols: {},
  },
  methods: {
    createNewMenu() {
      this.$emit("modalFinished", this.menu);
      this.$emit("close");
    },
  },
});
</script>
