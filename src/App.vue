<script setup>
import { ref } from "vue";
import List from "./components/List.vue";
import Cart from "./components/Cart.vue";

const cart = ref([]);

// Fonction pour ajouter un Pokémon au panier
const addToCart = (pokemon) => {
  cart.value.push(pokemon);
  console.log("Panier mis à jour :", cart.value);
};
</script>

<template>
  <header class="header">
    <div>This is the Header</div>
  </header>

  <main>
    <List @add-to-cart="addToCart" />
    <Cart :cart="cart" />
  </main>

  <footer class="footer">
    <div>This is the footer</div>
  </footer>
</template>

<style scoped>
header {
  background: rgb(255, 252, 78);
  padding: 10px;
  margin-bottom: 20px;
}

footer {
  background: pink;
  padding: 10px;
  margin-top: 10px;
}
</style>
