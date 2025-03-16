<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <p>Welcome, {{ user.name }}!</p>

    <div class="dashboard-section" v-if="user.role === 'volunteer'">
      <h3>Volunteer Panel</h3>
      <p>You can report stray animals and view park updates.</p>
    </div>

    <div class="dashboard-section" v-if="user.role === 'caregiver'">
      <h3>Caregiver Panel</h3>
      <p>Manage assigned animals and update their health status.</p>
    </div>

    <div class="dashboard-section" v-if="user.role === 'hr'">
      <h3>HR Panel</h3>
      <p>Manage participant records and financial reports.</p>
    </div>

    <div class="dashboard-section" v-if="user.role === 'board_member'">
      <h3>Board Member Panel</h3>
      <p>Review animal intake requests and organization updates.</p>
    </div>

    <div class="dashboard-section" v-if="user.role === 'ceo'">
      <h3>CEO Panel</h3>
      <p>Oversee operations and call meetings.</p>
    </div>

    <button class="dashboard-button" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ name: '', role: '' });

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    router.push('/');
    return;
  }
  user.value = JSON.parse(storedUser);
});

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.dashboard-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-section {
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dashboard-button {
  background-color: #6200ea;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
}

.dashboard-button:hover {
  background-color: #3700b3;
}
</style>