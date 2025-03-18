<template>
  <button @click="logoutUser" class="logout-button">Logout</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logoutUser = () => {
  // Remove items from localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('accessLevel');

  alert('Logged out successfully');

  // Redirect to the login page
  router.push('/login');
};
</script>

<style scoped>
.logout-button {
  background-color: #b00020;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.logout-button:hover {
  background-color: #7b0015;
}
</style>