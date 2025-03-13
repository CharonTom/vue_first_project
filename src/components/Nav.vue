<template>
  <nav class="nav">
    <router-link to="/" class="nav-link">Accueil</router-link>
    <router-link to="/inventory" class="nav-link">Inventory</router-link>
    <router-link to="/details" class="nav-link">Details</router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 15px;
  background: lightgray;
  padding: 10px;
  border-radius: 8px;
}

.nav-link {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.nav-link:hover {
  color: blue;
}
</style>
