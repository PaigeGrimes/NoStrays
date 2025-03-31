<template>
  <div class="layout-wrapper">
  <aside class="sidebar">
  <Sidebar />
  </aside>
  <div class="min-h-screen bg-gray-100 text-on-surface p-8">
    <h1 class="text-4xl font-bold mb-6">All Animals</h1>
    <p class="text-lg text-on-surface-variant mb-8">
      A list of every animal currently in our database:
    </p>

    <!-- Animal Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="animal in animals"
          :key="animal._id"
          class="bg-surface p-6 rounded-3xl shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-2xl font-semibold text-on-surface mb-2">
          {{ animal.name }}
        </h2>
        <p class="text-on-surface-variant">Species: {{ animal.species }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from '@/layout/AppSidebar.vue';
import axios from "axios";

// Reactive array to store all fetched animals
const animals = ref([]);

// Fetch animals on component mount
onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:5001/animals");
    animals.value = data; // store fetched animals
  } catch (error) {
    console.error("Error fetching animals:", error);
  }
});
</script>

<style scoped>
/* Material 3 Colors */
:root {
  --primary: #6750A4;
  --on-primary: #FFFFFF;
  --primary-container: #EADDFF;
  --on-primary-container: #21005D;

  --surface: #FFFFFF;
  --on-surface: #1D1B20;
  --on-surface-variant: #49454F;
  --bg-gray-light: #F5F7FA;
  --bg-dark: #1C1C1E;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* Material 3 Font */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

/* Main Content */
.min-h-screen {
  background-color: var(--bg-gray-light);
  color: var(--on-surface);
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.125rem;
  color: var(--on-surface-variant);
  margin-bottom: 2rem;
}

/* Animal Cards Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid .bg-surface {
  background-color: var(--surface);
  padding: 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 10px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.grid .bg-surface:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px var(--shadow-color);
}

.grid h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.grid p {
  font-size: 1rem;
  color: var(--on-surface-variant);
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    box-shadow: none;
    padding: 15px;
  }
}
</style>

