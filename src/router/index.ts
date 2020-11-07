import Vue from "vue";
import VueRouter from "vue-router";
import Account from "@/views/Account.vue";
import Detail from "@/views/Detail.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/detail",

  },
  {
    path: "/account",
    component: Account
  },
  {
    path: "/detail",
    component: Detail
  },
  {
    path: "/statistics",
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({

  routes
});

export default router;
