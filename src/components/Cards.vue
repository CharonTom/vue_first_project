<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["add-to-pokedex"]);

const pokemons = ref([]);

const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
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

const addToPokedex = (pokemon) => {
  // Émettre l'événement d'ajout au panier
  emit("add-to-pokedex", pokemon);
};
</script>

<template>
  <section>
    <div class="header">
      <h1>Choisissez vos Pokémon</h1>
      <hr />
      <div class="actions">
        <button @click="fetchPokemons">Charger les Pokémon</button>
        <button @click="toggleHeightSort">
          Trier par taille
          <span v-if="sortHeightDirection === 'asc'">▲</span>
          <span v-else-if="sortHeightDirection === 'desc'">▼</span>
          <span v-else>↕</span>
        </button>
      </div>
    </div>

    <!-- Filtres -->
    <div class="filters" v-if="pokemons.length">
      <label for="type-filter">Filtrer par type :</label>
      <select id="type-filter" v-model="selectedType">
        <option value="all">Tous</option>
        <option v-for="type in availableTypes" :key="type" :value="type">
          {{ capitalize(type) }}
        </option>
      </select>
    </div>

    <!-- Affichage sous forme de pokedexes -->
    <div class="card-container" v-if="filteredPokemons.length">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="pokemon-card"
      >
        <img
          :src="pokemon.sprites.front_default"
          @click="addToPokedex(pokemon)"
          :alt="pokemon.name"
          class="pokemon-image"
        />
        <div class="card-details">
          <h3>{{ capitalize(pokemon.name) }}</h3>
          <p><strong>Hauteur :</strong> {{ pokemon.height }}</p>
          <p><strong>Poids :</strong> {{ pokemon.weight }}</p>
          <p>
            <strong>Types :</strong>
            <span v-for="(type, index) in pokemon.types" :key="index">
              {{ capitalize(type.type.name) }}
              <span v-if="index !== pokemon.types.length - 1">, </span>
            </span>
          </p>
        </div>
      </div>
    </div>

    <p v-else class="message">Aucun Pokémon trouvé.</p>
  </section>
</template>

<style scoped>
/* Style général de la section */
section {
  background: radial-gradient(circle at top left, #fceabb, #f8b500);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
}

/* En-tête et actions */
.header {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

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

/* Conteneur de pokedexes */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Pokedexe Pokémon */
.pokemon-card {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #ff0000;
  border-radius: 10px;
  width: 200px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

/* Image du Pokémon */
.pokemon-image {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Détails de la pokedexe */
.card-details h3 {
  margin: 0 0 10px;
  font-size: 1.4em;
}

.card-details p {
  margin: 5px 0;
  font-size: 0.9em;
}

/* Message d'alerte */
.message {
  color: #ff0000;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  font-size: 1.2em;
}
</style>
