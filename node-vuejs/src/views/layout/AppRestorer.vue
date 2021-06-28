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

        <b-field :label="$t('restorer.name')">
          <b-input
            type="text"
            v-model="form.address"
            :placeholder="$t('restorer.address')"
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
          <div class="buttons mb-0">
            <b-button type="is-primary" @click="createArticle()">{{
              $t("restorer.createArticle")
            }}</b-button>
            <b-button
              type="is-warning"
              :disabled="!selectedArticle"
              @click="updateSelectedArticle()"
              >{{ $t("action.update") }}</b-button
            >
            <b-button
              type="is-danger"
              :disabled="!selectedArticle"
              @click="deleteSelectedArticle()"
              >{{ $t("action.delete") }}</b-button
            >
          </div>

          <b-table
            :selected.sync="selectedArticle"
            :data="restaurant.articles"
            :columns="columns.articles"
          ></b-table>
        </b-tab-item>

        <b-tab-item :label="$t('restorer.menus')">
          <div class="buttons mb-0">
            <b-button type="is-primary" @click="createMenu()">{{
              $t("restorer.createMenu")
            }}</b-button>
            <b-button
              type="is-warning"
              :disabled="!selectedMenu"
              @click="updateSelectedMenu()"
              >{{ $t("action.update") }}</b-button
            >
            <b-button
              type="is-danger"
              :disabled="!selectedMenu"
              @click="deleteSelectedMenu()"
              >{{ $t("action.delete") }}</b-button
            >
          </div>

          <b-table
            :selected.sync="selectedMenu"
            :data="restaurant.menus"
            :columns="columns.menus"
          ></b-table>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleModal from "../../components/restorer/ArticleModal.vue";
import MenuModal from "../../components/restorer/MenuModal.vue";

import restorerService from "../../services/restorerService";

export default Vue.extend({
  name: "app-restorer",
  data() {
    return {
      restaurant: null,
      selectedMenu: null,
      selectedArticle: null,
      form: {
        name: "",
        address: "",
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
        props: {
          modalType: this.$t("action.create"),
          finishButton: this.$t("action.create"),
        },
        events: {
          modalFinished: (article) => {
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
          modalType: this.$t("action.create"),
          articles: this.restaurant.articles,
          articlesCols: this.columns.articles,
        },
        events: {
          modalFinished: (menu) => {
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
    deleteSelectedArticle() {
      restorerService
        .deleteArticle(this.selectedArticle)
        .then(() => {
          const index = this.restaurant.articles.findIndex(
            (a) => a.id == this.selectedArticle.id
          );
          this.restaurant.articles.splice(index, 1);
          this.selectedArticle = null;
        })
        .catch((error) => {
          this.$buefy.toast.open({
            message: this.$t("action.failed"),
            type: "is-danger",
          });
        });
    },
    deleteSelectedMenu() {
      restorerService
        .deleteMenu(this.selectedMenu)
        .then(() => {
          const index = this.restaurant.menus.findIndex(
            (a) => a.id == this.selectedMenu.id
          );
          this.restaurant.menus.splice(index, 1);
          this.selectedMenu = null;
        })
        .catch((error) => {
          this.$buefy.toast.open({
            message: this.$t("action.failed"),
            type: "is-danger",
          });
        });
    },
    updateSelectedArticle() {
      this.$buefy.modal.open({
        parent: this,
        component: ArticleModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalType: this.$t("action.update"),
          article: this.selectedArticle,
        },
        events: {
          modalFinished: (article) => {
            restorerService
              .updateArticle(article)
              .then((article) => {
                const index = this.restaurant.articles.findIndex(
                  (a) => a.id == article.id
                );
                this.restaurant.articles[index] = article;
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
    updateSelectedMenu() {
      this.$buefy.modal.open({
        parent: this,
        component: MenuModal,
        hasModalCard: true,
        trapFocus: true,
        props: {
          modalType: this.$t("action.update"),
          menu: this.selectedMenu,
          articles: this.restaurant.articles,
          articlesCols: this.columns.articles,
        },
        events: {
          modalFinished: (menu) => {
            restorerService
              .updateMenu(menu)
              .then((menu) => {
                const index = this.restaurant.menus.findIndex(
                  (a) => a.id == menu.id
                );
                this.restaurant.menus[index] = menu;
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
  },
  created() {
    restorerService.getUserRestaurant().then((restaurant) => {
      this.restaurant = restaurant;
    });
  },
});
</script>