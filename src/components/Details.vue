<script setup>
import {} from "vue";
</script>

<template>
  <section class="pokedex">
    <h2>Nom</h2>
  </section>
</template>

<style scoped>
.pokedex {
  max-width: 600px;
  margin: 30px auto;
  background: linear-gradient(135deg, #fefefe, #fff);
  border: 1px solid;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
}

.pokedex h2 {
  text-align: center;
  color: #000000;
  margin-bottom: 20px;
  font-size: 2em;
}

.pokedex ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.pokedex li {
  background: #fff;
  border: 1px solid #e60808;
  border-radius: 10px;
  padding: 15px;
  width: 140px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pokedex li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pokedex img {
  width: 80px;
  height: auto;
  margin-bottom: 10px;
}

.pokedex span {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

button {
  background: linear-gradient(45deg, #ffcc00, #ff0000);
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

button:hover {
  background: linear-gradient(45deg, #ff0000, #ffcc00);
  transform: scale(1.05);
}
</style>
