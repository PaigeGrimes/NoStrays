<template>
  <div class="layout-wrapper">
  <aside class="sidebar">
    <Sidebar />
  </aside>
  <div class="volunteer-container">
    <h2>Volunteer Dashboard</h2>
    <p>Report Stray Animals</p>
    <div class="report-form">
      <label>Animal Species:</label>
      <input v-model="animalDescription" class="input-field" />

      <label>Location Spotted:</label>
      <input v-model="location" class="input-field" />

      <label>Additional Notes:</label>
      <textarea v-model="notes" class="input-field"></textarea>

      <button @click="reportStray" class="volunteer-button">Report Stray</button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Sidebar from "@/layout/AppSidebar.vue";

const router = useRouter();
const currentUser = ref(null);
const animalDescription = ref('');
const location = ref('');
const notes = ref('');

onMounted(() => {
  const stored = localStorage.getItem('user');
  if (!stored) {
    router.push('/login');
    return;
  }
  currentUser.value = JSON.parse(stored);

  // volunteer or above => accessLevel ≥ 1
  if (currentUser.value.accessLevel < 1) {
    router.push('/');
  }
});

async function reportStray() {
  if (!animalDescription.value || !location.value) {
    alert('Description and location are required');
    return;
  }
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/volunteer/report-stray`, {
      animalDescription: animalDescription.value,
      location: location.value,
      notes: notes.value
    });
    alert('Stray animal reported!');
    animalDescription.value = '';
    location.value = '';
    notes.value = '';
  } catch (err) {
    console.error('Failed to report stray', err);
    alert('Error reporting stray');
  }
}
</script>

<style scoped>
.volunteer-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.report-form {
  margin-top: 1.5rem;
  text-align: left;
}

.input-field {
  width: 100%;
  margin: 0.5rem 0;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.volunteer-button {
  background-color: #6200ea;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-top: 1rem;
}

.volunteer-button:hover {
  background-color: #3700b3;
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
