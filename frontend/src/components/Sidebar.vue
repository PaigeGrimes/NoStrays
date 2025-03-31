<template>
  <div class="sidebar">
    <h2>NSAE Dashboard</h2>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li v-if="user.accessLevel >= 1"><router-link to="/volunteer">Volunteer</router-link></li>
      <li v-if="user.accessLevel >= 2"><router-link to="/animals">Animals</router-link></li>
      <li v-if="user.accessLevel >= 4"><router-link to="/board">Board</router-link></li>
      <li v-if="user.accessLevel === 4"><router-link to="/admin">Admin</router-link></li>
      <li @click="handleLogout">Logout</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
});

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 15px 0;
  cursor: pointer;
}
.sidebar a {
  text-decoration: none;
  color: white;
}
.sidebar a:hover {
  text-decoration: underline;
}
</style>
