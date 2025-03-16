<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/signup" class="nav-link">Sign Up</router-link>
    <router-link to="/login" class="nav-link">Login</router-link>
    <router-link v-if="isAuthenticated" to="/dashboard" class="nav-link">Dashboard</router-link>
    <button v-if="isAuthenticated" class="nav-button" @click="logout">Logout</button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  router.push('/');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: #6200ea;
  color: white;
  font-size: 18px;
  border-radius: 12px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #d32f2f;
}
</style>
