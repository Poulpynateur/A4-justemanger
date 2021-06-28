<template>
  <div class="container box mt-6">
    <div v-if="!restaurant">
      <h1 class="title">{{ $t("restorer.noRestaurant") }}</h1>
      <form action="">
        <b-field :label="$t('restorer.name')">
          <b-input
            type="text"
            v-model="form.name"
            :placeholder="$t('restorer.name')"
            required
          >
          </b-input>
        </b-field>

        <b-button
          :label="$t('action.create')"
          @click="createRestaurant()"
          type="is-primary"
        />
      </form>
    </div>
    <div v-else>
      <h1 class="title">
        {{ $t("restorer.manage") + " : " + restaurant.name }}
      </h1>

      <b-tabs>
        <b-tab-item :label="$t('restorer.orders')"> </b-tab-item>
        <b-tab-item :label="$t('restorer.articles')">
          <b-button type="is-light" @click="createArticle()" expanded>{{
            $t("restorer.createArticle")
          }}</b-button>
          <b-table :data="restaurant.menus" :columns="columns.menus"></b-table>
        </b-tab-item>

        <b-tab-item :label="$t('restorer.menus')">
          <b-button type="is-light" @click="createMenu()" expanded>{{
            $t("restorer.createMenu")
          }}</b-button>
          <b-table
            :data="restaurant.articles"
            :columns="columns.articles"
          ></b-table>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleModal from "../../components/ArticleModal.vue";
import MenuModal from "../../components/MenuModal.vue";

import restorerService from "../../services/restorerService";

export default Vue.extend({
  name: "app-restorer",
  data() {
    return {
      restaurant: null,
      form: {
        name: "",
      },
      columns: {
        menus: [
          {
            field: "name",
            label: this.$t("restorer.columns.menus.name"),
            width: "300",
          },
          {
            field: "subArticles",
            label: this.$t("restorer.columns.menus.articles"),
          },
          {
            field: "price",
            label: this.$t("restorer.columns.menus.price") + " €",
            width: "100",
          },
        ],
        articles: [
          { field: "name", label: this.$t("restorer.columns.articles.name") },
          {
            field: "price",
            label: this.$t("restorer.columns.articles.price") + " €",
            width: "100",
          },
        ],
      },
    };
  },
  methods: {
    createRestaurant() {
      restorerService
        .sendNewRestaurant(this.form)
        .then((restaurant) => {
          this.restaurant = restaurant;
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: this.$t("action.failed"),
            type: "is-danger",
          });
        });
    },
    createArticle() {
      this.$buefy.modal.open({
        parent: this,
        component: ArticleModal,
        hasModalCard: true,
        trapFocus: true,
        events: {
          articleCreated: (article) => {
            restorerService
              .sendNewArticle(article)
              .then((article) => {
                this.restaurant.articles.push(article);
              })
              .catch((error) => {
                this.$buefy.toast.open({
                  message: this.$t("action.failed"),
                  type: "is-danger",
                });
              });
          },
        },
      });
    },
    createMenu() {
      this.$buefy.modal.open({
        parent: this,
        component: MenuModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          articles: this.restaurant.articles,
          articlesCols: this.columns.articles,
        },
        events: {
          menuCreated: (menu) => {
            restorerService
              .sendNewMenu(menu)
              .then((menu) => {
                this.restaurant.menus.push(menu);
              })
              .catch(() => {
                this.$buefy.toast.open({
                  message: this.$t("action.failed"),
                  type: "is-danger",
                });
              });
          },
        },
      });
    },
  },
  created() {
    restorerService.getUserRestaurant().then((restaurant) => {
      this.restaurant = restaurant;
    });
  },
});
</script>