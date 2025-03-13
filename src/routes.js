import { createRouter, createWebHistory } from "vue-router";
import Cards from "./components/Cards.vue";
import Inventory from "./components/Inventory.vue";
import Details from "./components/Details.vue";

const routes = [
  {
    path: "/",
    component: Cards,
    props: true,
  },
  {
    path: "/inventory",
    component: Inventory,
    props: true,
  },
  {
    path: "/details/:id",
    component: Details,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
