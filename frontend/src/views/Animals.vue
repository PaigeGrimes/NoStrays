<template>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
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
}

/* Material 3 Font */
body {
  font-family: "Roboto", sans-serif;
}
</style>
