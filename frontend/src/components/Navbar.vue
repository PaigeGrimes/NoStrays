<template>
  <nav class="navbar">
    <div v-if="accessLevel === 4">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/messages" class="nav-link">Messages</router-link>
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/animals" class="nav-link">Animals</router-link>
      <router-link to="/admin" class="nav-link">Admin</router-link>
    </div>
    <div v-else-if="accessLevel < 3 && accessLevel > 0">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/messages" class="nav-link">Messages</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/animals" class="nav-link">Animals</router-link>
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
    </div>
    <div v-else>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/messages" class="nav-link">Messages</router-link>
      <router-link to="/donation" class="nav-link">Donate</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/animals" class="nav-link">Animals</router-link>

    </div>

    <!-- User Info & Logout -->
    <div v-if="accessLevel > 0">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    {{ accessLevel }}
  </nav>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);
const accessLevel = ref(4);

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessLevel !== undefined) {
    accessLevel.value = user.accessLevel;
  }
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  accessLevel.value = 0;
  router.push('/login'); // Redirect to login after logout

};
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #6200ea; /* Primary Color */
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  margin-right: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link:active {
  background-color: rgba(255, 255, 255, 0.4);
}

.nav-link:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
}

.nav-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #d32f2f;
}

.nav-button:active {
  background-color: #b71c1c;
}
</style>