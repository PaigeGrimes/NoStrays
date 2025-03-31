<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <div class="caregiver-container">
      <h2>Caregiver Dashboard</h2>
      <div v-for="(animal, index) in animals" :key="index" class="animal-item">
        <h3>{{ animal.name }}</h3>
        <p>Species: {{ animal.species }}</p>
        <button @click="removeAnimal(animal._id)" class="caregiver-button danger">Remove</button>
      </div>

      <div class="add-animal-form">
        <h3>Add New Animal</h3>
        <label>Animal Name:</label>
        <input v-model="newName" type="text" class="input-field"/>
        <label>Species:</label>
        <input v-model="newSpecies" type="text" class="input-field"/>
        <button @click="addAnimal" class="caregiver-button">Add Animal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import Sidebar from '@/layout/AppSidebar.vue';

const animals = ref([]);
const newName = ref('');
const newSpecies = ref('');

// Fetch animals on mount
onMounted(refreshAnimals);

// Fetch all animals
async function refreshAnimals() {
  try {
    const res = await axios.get('http://localhost:5001/api/animals');
    animals.value = res.data;
  } catch (err) {
    console.error('Error fetching animals:', err);
  }
}

// Add new animal
async function addAnimal() {
  if (!newName.value || !newSpecies.value) {
    alert('Name and species required');
    return;
  }
  try {
    await axios.post('http://localhost:5001/api/caregiver/animals', {
      name: newName.value,
      species: newSpecies.value,
    });
    alert('Animal added!');
    newName.value = '';
    newSpecies.value = '';
    refreshAnimals();
  } catch (err) {
    console.error('Add animal error:', err);
    alert('Failed to add animal');
  }
}

// Remove animal
async function removeAnimal(animalId) {
  try {
    await axios.delete(`http://localhost:5001/api/caregiver/animals/${animalId}`);
    alert('Animal removed!');
    refreshAnimals();
  } catch (err) {
    console.error('Remove animal error:', err);
    alert('Failed to remove animal');
  }
}
</script>

<style scoped>
.caregiver-container {
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.animal-item {
  background: #f9f9f9;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  text-align: left;
}

.add-animal-form {
  margin-top: 2rem;
  text-align: left;
}

.input-field {
  width: 100%;
  margin: 0.5rem 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.caregiver-button {
  background-color: #6200ea;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 16px;
  font-weight: 500;
}

.caregiver-button:hover {
  background-color: #3700b3;
}

.danger {
  background-color: #e91e63 !important;
}

.danger:hover {
  background-color: #c2185b !important;
}

.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f4f4f9; /* Light grayish background for a more professional look */
  color: #333;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px; /* Reduced the width to make it more compact */
  background: #2e1f4c; /* Deep purple for a more luxurious vibe */
  color: #fff;
  padding: 10px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  font-size: 1.3em;
}

</style>
