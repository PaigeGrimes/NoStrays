<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <main class="layout-main">
      <div class="dashboard-header">
        <h2>Welcome, {{ user.name }}!</h2>
        <p class="access-level">Your access level: {{ user.accessLevel }}</p>
      </div>

      <div class="stats-container">
        <StatsWidget />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "@/layout/AppSidebar.vue";
import StatsWidget from '@/components/StatsWidget.vue';

// Simulate fetching user data (or use your store)
const user = ref({ name: "", accessLevel: 0 });

onMounted(() => {
  const storedUsername = localStorage.getItem("username");
  const storedAccessLevel = localStorage.getItem("accessLevel");

  if (!storedUsername || !storedAccessLevel) {
    // If no user, redirect to login
    useRouter().push("/login");
    return;
  }

  user.value.name = storedUsername;
  user.value.accessLevel = parseInt(storedAccessLevel, 10);
});
</script>


<style scoped lang="scss">
/* ========== LUXURY DASHBOARD STYLE ========== */
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
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  font-size: 1.3em;
}

/* Main Content */
.layout-main {
  flex: 1;
  padding: 40px;
  background: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  margin: 20px;
  font-size: 18px; /* Increased font size for better readability */
  line-height: 1.6; /* Added more line-height for spacing between text */
}

/* Dashboard Header */
.dashboard-header {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Increased gap between elements */
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0; /* Light gray border for a clean professional look */
}

.dashboard-header h2 {
  font-size: 32px; /* Increased font size for the title */
  font-weight: 600;
  color: #2e1f4c; /* Deep purple header for consistency with the sidebar */
}

.access-level {
  font-size: 18px; /* Increased font size for better visibility */
  color: #666;
}

/* Stats Section */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px; /* Increased gap between stats cards */
  margin-top: 30px;
}

.stats-container > * {
  flex: 1;
  min-width: 300px; /* Increased minimum width for a more spacious layout */
  background: #fff;
  padding: 25px; /* Increased padding for better spacing */
  border-radius: 0; /* Removed rounded edges for a sharper look */
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
  color: #333;
}

.stats-container > *:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1); /* Subtle hover effect */
}

.stats-container > .stat-card {
  background: #f5f5f5; /* Light background for stats cards */
  border: 1px solid #ddd; /* Border to define edges */
}

</style>
