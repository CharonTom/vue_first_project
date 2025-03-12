<script setup>
import { ref, computed } from "vue";

const pokemons = ref([]);
const cart = ref([]);

const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await response.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  pokemons.value = detailedPokemons;
  console.log(pokemons.value);
};

// Fonction pour capitaliser la première lettre
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const sortHeightDirection = ref("none");
const selectedType = ref("all");

// Fonction de basculement du tri par hauteur
const toggleHeightSort = () => {
  if (sortHeightDirection.value === "none") {
    sortHeightDirection.value = "asc";
  } else if (sortHeightDirection.value === "asc") {
    sortHeightDirection.value = "desc";
  } else {
    sortHeightDirection.value = "none";
  }
};

// Calcul des types disponibles à partir des Pokémon récupérés
const availableTypes = computed(() => {
  const types = new Set(); // Set permet de stocker des données sans doublons
  pokemons.value.forEach((pokemon) => {
    pokemon.types.forEach((typeInfo) => {
      types.add(typeInfo.type.name);
    });
  });
  return Array.from(types);
});

// Propriété calculée pour appliquer à la fois le filtre par type et le tri
const filteredPokemons = computed(() => {
  let result = pokemons.value;

  // Tri selon le critère de hauteur ou alphabétique par défaut
  if (sortHeightDirection.value === "asc") {
    result = result.slice().sort((a, b) => a.height - b.height);
  } else if (sortHeightDirection.value === "desc") {
    result = result.slice().sort((a, b) => b.height - a.height);
  } else {
    result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  // Filtrer par type si un type est sélectionné
  if (selectedType.value !== "all") {
    result = result.filter((pokemon) =>
      pokemon.types.some(
        (typeInfo) => typeInfo.type.name === selectedType.value
      )
    );
  }

  return result;
});

const addToCart = (pokemon) => {
  emit("add-to-cart", pokemon);
};
</script>

<template>
  <section>
    <div class="header">
      <h1>Liste des 20 premiers Pokémon</h1>
      <hr />
      <button @click="fetchPokemons">Charger les Pokémon</button>
    </div>

    <!-- Filtre par type -->
    <div class="filters" v-if="pokemons.length">
      <label for="type-filter">Filtrer par type :</label>
      <select id="type-filter" v-model="selectedType">
        <option value="all">Tous</option>
        <option v-for="type in availableTypes" :key="type" :value="type">
          {{ capitalize(type) }}
        </option>
      </select>
    </div>

    <table v-if="filteredPokemons.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Nom</th>
          <!-- En-tête cliquable pour basculer le tri par hauteur -->
          <th @click="toggleHeightSort" style="cursor: pointer">
            Hauteur
            <span v-if="sortHeightDirection === 'asc'">▲</span>
            <span v-else-if="sortHeightDirection === 'desc'">▼</span>
            <span v-else>↕</span>
          </th>
          <th>Poids</th>
          <th>Types</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pokemon in filteredPokemons" :key="pokemon.id">
          <td>{{ pokemon.id }}</td>
          <td>
            <img
              :src="pokemon.sprites.front_default"
              @click="addToCart(pokemon)"
              :alt="pokemon.name"
              class="pokemon-image"
            />
          </td>
          <td>{{ capitalize(pokemon.name) }}</td>
          <td>{{ pokemon.height }}</td>
          <td>{{ pokemon.weight }}</td>
          <td>
            <span v-for="(type, index) in pokemon.types" :key="index">
              {{ capitalize(type.type.name) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="message">Aucun Pokémon trouvé.</p>
  </section>
</template>

<style scoped>
/* Fond de la section avec un dégradé rappelant l'univers Pokémon */
section {
  background: radial-gradient(circle at top left, #fceabb, #f8b500);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
}

/* En-tête avec un effet lumineux */
.header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

/* Bouton flashy avec dégradé et effet de zoom */
button {
  background: linear-gradient(45deg, #ffcc00, #ff0000);
  border: 2px solid #fff;
  color: #fff;
  font-weight: bold;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
}

/* Filtres */
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.filters label {
  margin-right: 10px;
  font-weight: bold;
}

/* Tableau stylisé */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  overflow: hidden;
  border: 5px solid #ff0000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

table thead {
  background: linear-gradient(90deg, #ff0000, #ffcc00);
  color: #fff;
}

table th,
table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table tbody tr {
  transition: background 0.3s ease;
}

table tbody tr:hover {
  background: rgba(255, 204, 0, 0.3);
}

.pokemon-image {
  width: 80px;
  height: auto;
  display: block;
  cursor: pointer;
}

.message {
  color: #ff0000;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  font-size: 1.2em;
}
</style>
