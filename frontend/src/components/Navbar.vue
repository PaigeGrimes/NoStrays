<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="nav-logo">NSAE</router-link>
    </div>


    <div class="nav-right">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/about" class="nav-item">About</router-link>
      <router-link to="/donation" class="nav-item">Donate</router-link>

      <!-- Show only the Dashboard if the user is logged in -->
      <router-link v-if="isLoggedIn" to="/dashboard" class="nav-item">Dashboard</router-link>

      <!-- Show logout if logged in -->
      <button v-if="isLoggedIn" @click="handleLogout" class="nav-button">Logout</button>

      <!-- Show login/signup if user is NOT logged in -->
      <template v-else>
        <router-link to="/login" class="nav-item">Login</router-link>
        <router-link to="/signup" class="nav-item">Signup</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import logo from "@/assets/nsae_logo.png";
// Define a reactive variable for user
const router = useRouter();

const isLoggedIn = computed(() => {
  // Check if the user is logged in by checking localStorage
  return !!localStorage.getItem('userId');
});

// Handle logout
const handleLogout = async () => {
  // Clear localStorage on logout
  localStorage.removeItem('userId');
  localStorage.removeItem('accessLevel');
  localStorage.removeItem('username');

  // Navigate to login page after logout
  await router.push('/login');
};

// Watch for changes in localStorage and re-render
watchEffect(() => {
  if (isLoggedIn.value) {
    console.log("User is logged in");
  } else {
    console.log("User is logged out");
  }
});
</script>







<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2e1f4c;
  color:white;
  padding: 10px 20px;
}

.nav-left {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav-logo {
  color: white;
  text-decoration: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 5px 10px;
}

.nav-item:hover {
  text-decoration: underline;
}

.nav-button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.nav-button:hover {
  background: darkred;
}
</style>
