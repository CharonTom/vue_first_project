<script setup>
import { ref } from "vue";
import Cards from "./components/Cards.vue";
import Pokedex from "./components/Inventory.vue";
import Nav from "./components/Nav.vue";

const pokedex = ref([]);

// Fonction pour ajouter un Pokémon au panier
const addToPokedex = (pokemon) => {
  pokedex.value.push(pokemon);
  console.log("Panier mis à jour :", pokedex.value);
};

const removeFromPokedex = (pokemonId) => {
  pokedex.value = pokedex.value.filter((pokemon) => pokemon.id !== pokemonId);
  console.log("Pokedex mis à jour après suppression :", pokedex.value);
};
</script>

<template>
  <header class="header">
    <div>This is the Logo</div>
    <Nav />
  </header>

  <main class="main">
    <router-view
      :pokedex="pokedex"
      @add-to-pokedex="addToPokedex"
      @remove-from-pokedex="removeFromPokedex"
    />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer {
  background: pink;
  padding: 10px;
  margin-top: 10px;
}

.main {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
