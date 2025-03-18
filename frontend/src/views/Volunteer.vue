<template>
  <div class="volunteer-container">
    <h2>Volunteer Dashboard</h2>
    <p>Report Stray Animals</p>
    <div class="report-form">
      <label>Description of Animal:</label>
      <input v-model="animalDescription" class="input-field" />

      <label>Location Spotted:</label>
      <input v-model="location" class="input-field" />

      <label>Additional Notes:</label>
      <textarea v-model="notes" class="input-field"></textarea>

      <button @click="reportStray" class="volunteer-button">Report Stray</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const currentUser = ref(null);
const animalDescription = ref('');
const location = ref('');
const notes = ref('');

onMounted(() => {
  const stored = localStorage.getItem('user');
  console.log('Stored user data:', stored);
  if (!stored) {
    console.log('No user data found in localStorage, redirecting to login.');
    router.push('/login');
    return;
  }
  try {
    currentUser.value = JSON.parse(stored);
    console.log('Parsed current user:', currentUser.value);
  } catch (e) {
    console.error('Failed to parse user data:', e);
    router.push('/login');
    return;
  }

  if (currentUser.value && typeof currentUser.value.accessLevel !== 'undefined') {
    console.log('Current user access level:', currentUser.value.accessLevel);
    if (currentUser.value.accessLevel < 1) {
      console.log('Access level too low:', currentUser.value.accessLevel);
      router.push('/');
    } else {
      console.log('Access level sufficient:', currentUser.value.accessLevel);
    }
  } else {
    console.log('Access level not found, redirecting to login.');
    router.push('/login');
  }
});

async function reportStray() {
  if (!animalDescription.value || !location.value) {
    alert('Description and location are required');
    return;
  }
  try {
    const res = await axios.post('http://localhost:5001/api/volunteer/report-stray', {
      username: currentUser.value.username,
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
</style>
