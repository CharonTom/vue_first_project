<script setup>
import { ref } from "vue";
import Cards from "./components/Cards.vue";
import Pokedex from "./components/Pokedex.vue";

const pokedex = ref([]);

// Fonction pour ajouter un Pokémon au panier
const addToPokedex = (pokemon) => {
  pokedex.value.push(pokemon);
  console.log("Panier mis à jour :", pokedex.value);
};
</script>

<template>
  <header class="header">
    <div>This is the Header</div>
  </header>

  <main>
    <Cards @add-to-pokedex="addToPokedex" />
    <Pokedex :pokedex="pokedex" />
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
