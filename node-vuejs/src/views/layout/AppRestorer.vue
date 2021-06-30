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

        <b-field :label="$t('restorer.category')">
          <b-input
            type="text"
            v-model="form.category"
            :placeholder="$t('restorer.category')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('restorer.address')">
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
        <b-tab-item :label="$t('restorer.orders')">
          <b-table :data="orders">
            <b-table-column field="customer" label="Client" v-slot="props">
              {{
                props.row.customer.firstName + " " + props.row.customer.lastName
              }}
            </b-table-column>
            <b-table-column field="date" label="Date" v-slot="props">
              {{ props.row.date }}
            </b-table-column>
            <b-table-column field="state" label="État" v-slot="props">
              {{ props.row.state }}
            </b-table-column>
            <b-table-column v-slot="props" width="100">
              <b-button type="is-success" @click="updateOrder(props.row)"
                >Terminer</b-button
              >
            </b-table-column>
          </b-table>
        </b-tab-item>

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

          <b-table :selected.sync="selectedMenu" :data="restaurant.menus">
            <b-table-column
              width="300"
              field="name"
              :label="$t('restorer.columns.menus.name')"
              v-slot="props"
            >
              {{ props.row.name }}
            </b-table-column>
            <b-table-column
              field="subArticles"
              :label="$t('restorer.columns.menus.articles')"
              v-slot="props"
            >
              <span>
                <b-tag v-for="sub in props.row.subArticles" :key="sub.id">
                  {{ sub.name }}
                </b-tag>
              </span>
            </b-table-column>
            <b-table-column
              width="100"
              field="price"
              :label="$t('restorer.columns.menus.price') + ' €'"
              v-slot="props"
            >
              {{ props.row.price }}
            </b-table-column>
          </b-table>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleModal from "../../components/restorer/ArticleModal.vue";
import MenuModal from "../../components/restorer/MenuModal.vue";

import restaurantService from "../../services/restaurantService";
import { OrderDTO } from "../../store/models/order";
import { ArticleDTO } from "../../store/models/restaurant";

export default Vue.extend({
  name: "app-restorer",
  data() {
    return {
      restaurant: null,
      selectedMenu: null,
      selectedArticle: null,
      orders: [],
      form: {
        ownerId: 0,
        name: "",
        address: "",
        category: "",
      },
      columns: {
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
    updateOrder(order: OrderDTO) {
      restaurantService
        .updateOrder(order.id, 'restaurant.finished')
        .then((order) => {
          const index = this.orders.findIndex(
            (a) => a.id == order.id
          );
          this.orders[index] = order;
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: this.$t("action.failed"),
            type: "is-danger",
          });
        });
    },
    createRestaurant() {
      this.form.ownerId = this.$store.state.currentUser.id;
      restaurantService
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
            restaurantService
              .sendNewArticle(this.restaurant.id, article)
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
            restaurantService
              .sendNewArticle(this.restaurant.id, menu)
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
      restaurantService
        .deleteArticle(this.restaurant.id, this.selectedArticle)
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
      restaurantService
        .deleteMenu(this.restaurant.id, this.selectedMenu)
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
            restaurantService
              .updateArticle(this.restaurant.id, article)
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
            restaurantService
              .updateMenu(this.restaurant.id, menu)
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
    restaurantService.getUserRestaurant().then((restaurant) => {
      this.restaurant = restaurant;
      restaurantService.getRestaurantOrders(restaurant.id).then((orders) => {
        this.orders = orders;
      });
    });
  },
});
</script>