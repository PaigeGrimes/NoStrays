<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <div class="min-h-screen bg-gray-100 text-on-surface p-8">
      <h1 class="text-4xl font-bold mb-6">Animal Submissions Approval</h1>
      <p class="text-lg text-on-surface-variant mb-8">
        Review pending animal submissions. Click Accept to add the animal to our database, or Deny to reject the submission.
      </p>

      <div v-if="errorMessage" class="mb-4 text-red-600">
        {{ errorMessage }}
      </div>

      <!-- Submission Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="submission in submissions"
            :key="submission._id"
            class="bg-surface p-6 rounded-3xl shadow-md hover:shadow-lg transition"
        >
          <h2 class="text-2xl font-semibold text-on-surface mb-2">
            {{ submission.name }}
          </h2>
          <p class="text-on-surface-variant mb-1">Species: {{ submission.species }}</p>
          <p class="text-on-surface-variant mb-1">Color: {{ submission.color }}</p>
          <p class="text-on-surface-variant mb-4">
            Submitted: {{ formatDate(submission.submittedAt) }}
          </p>
          <div class="flex space-x-2">
            <button
                @click="acceptSubmission(submission)"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Accept
            </button>
            <button
                @click="denySubmission(submission)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
      <div v-if="!submissions.length" class="mt-6">
        <p class="text-lg text-on-surface-variant">No pending submissions.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from '@/layout/AppSidebar.vue';
import axios from "axios";

const submissions = ref([]);
const errorMessage = ref("");
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Fetch pending animal submissions on component mount
onMounted(async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/api/animalSubmissions/pending`);
    submissions.value = data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    errorMessage.value = "Failed to fetch submissions.";
  }
});

// Accept a submission (backend moves data from animal_submissions to animals)
async function acceptSubmission(submission) {
  try {
    await axios.post(`${API_BASE}/api/animalSubmissions/accept`, {
      submissionId: submission._id
    });
    // Remove accepted submission from the list
    submissions.value = submissions.value.filter(s => s._id !== submission._id);
  } catch (error) {
    console.error("Error accepting submission:", error);
    errorMessage.value = "Failed to accept submission.";
  }
}

// Deny a submission (backend removes it from animal_submissions)
async function denySubmission(submission) {
  try {
    await axios.post(`${API_BASE}/api/animalSubmissions/deny`, {
      submissionId: submission._id
    });
    // Remove denied submission from the list
    submissions.value = submissions.value.filter(s => s._id !== submission._id);
  } catch (error) {
    console.error("Error denying submission:", error);
    errorMessage.value = "Failed to deny submission.";
  }
}

// Format date to a readable string
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}
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

/* Layout Wrapper */
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f4f4f9;
  color: #333;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #2e1f4c;
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

/* Grid Animal Card Styles */
.bg-surface {
  background-color: var(--surface);
}
</style>
