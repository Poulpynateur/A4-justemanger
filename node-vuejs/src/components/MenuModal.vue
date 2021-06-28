<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("restorer.createArticle") }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field :label="$t('restorer.columns.articles.name')">
          <b-input
            type="text"
            v-model="newMenu.name"
            :placeholder="$t('restorer.columns.articles.name')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.columns.articles.price')">
          <b-input
            type="text"
            v-model="newMenu.price"
            :placeholder="$t('restorer.columns.articles.price')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.articles')">
          <b-table
            :data="articles"
            :columns="articlesCols"
            :checked-rows.sync="checkedArticles"
            checkable
            :checkbox-position="'left'"
          >
            <template #bottom-left>
              <b>{{ $t("restorer.totalChecked") }}</b
              >: {{ checkedArticles.length }}
            </template>
          </b-table>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button :label="$t('action.cancel')" @click="$emit('close')" />
        <b-button
          :label="$t('action.create')"
          @click="createNewMenu()"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { MenuDTO } from "../store/models/restaurant";

export default Vue.extend({
  name: "menu-modal",
  props: ["articles", "articlesCols"],
  data() {
    return {
      newMenu: new MenuDTO(),
      checkedArticles: [],
    };
  },
  methods: {
    createNewMenu() {
      this.newMenu.articles = this.checkedArticles;
      this.$emit("menuCreated", this.newMenu);
      this.$emit("close");
    },
  },
});
</script>
