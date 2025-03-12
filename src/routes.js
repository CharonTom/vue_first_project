import { createRouter, createWebHistory } from "vue-router";
import Cards from "./components/Cards.vue";
import Pokedex from "./components/Pokedex.vue";

const routes = [
  {
    path: "/",
    component: Cards,
    props: true,
  },
  {
    path: "/pokedex",
    component: Pokedex,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
