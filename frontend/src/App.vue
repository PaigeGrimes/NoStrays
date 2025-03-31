<template>
  <div>
    <Navbar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from "@/layout/AppSidebar.vue";
import { ref, onMounted } from "vue";

const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = !localStorage.getItem("user");
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
@import "@/assets/styles.scss";

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}
/* Sidebar */
.sidebar {
  width: 280px;
  background: #1c1c1e;
  color: #fff;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  color: #333;
  font-family: 'Inter', sans-serif;
}
</style>
