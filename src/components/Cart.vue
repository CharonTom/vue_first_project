<script setup>
import { defineProps } from "vue";

// Déclaration de la prop "cart" qui est de type Array
const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="cart">
    <h2>🛒 Mon Panier</h2>
    <div v-if="cart && cart.length">
      <ul>
        <li v-for="pokemon in cart" :key="pokemon.id">
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
          <span>{{ pokemon.name }}</span>
          <button @click="removeFromCart(pokemon.id)">❌</button>
        </li>
      </ul>
    </div>
    <p v-else>Aucun Pokémon dans le panier.</p>
  </section>
</template>
