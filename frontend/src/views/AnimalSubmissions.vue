<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <div class="admin-container">
      <h1 class="title">Animal Submissions Approval</h1>
      <p class="text-lg text-on-surface-variant mb-10">
        Review pending animal submissions. Click "Accept" to add the animal to our database, or "Deny" to reject the submission.
      </p>

      <div v-if="errorMessage" class="mb-6 text-red-600">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Submission Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="submission in submissions"
            :key="submission._id"
            class="action-card"
        >
          <h2 class="text-2xl font-semibold text-on-surface mb-2">
            {{ submission.animalDescription }}
          </h2>
          <div class="text-on-surface-variant mb-2">
            <strong>Reporter:</strong> {{ submission.reporterUsername }}
          </div>
          <div class="text-on-surface-variant mb-2">
            <strong>Location:</strong> {{ submission.location }}
          </div>
          <div class="text-on-surface-variant mb-4">
            <strong>Notes:</strong> {{ submission.notes || 'No additional notes' }}
          </div>
          <div class="text-on-surface-variant mb-4">
            <strong>Reported:</strong> {{ formatDate(submission.reportedAt) }}
          </div>

          <!-- Animal Naming Section -->
          <div v-if="submission.isNaming">
            <label for="animalName" class="block mb-2">Name the Animal:</label>
            <input
                v-model="submission.animalName"
                id="animalName"
                type="text"
                class="input"
                placeholder="Enter animal's name"
            />
          </div>

          <div class="flex space-x-4 mt-4">
            <button
                @click="startNaming(submission)"
                class="button accept"
            >
              Start Naming
            </button>
            <button
                @click="acceptSubmission(submission)"
                class="button accept"
                :disabled="!submission.animalName"
            >
              Accept
            </button>
            <button
                @click="denySubmission(submission)"
                class="button deny"
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
    // Mark each submission for naming
    submissions.value = data.map(submission => ({
      ...submission,
      isNaming: false, // Initially, don't show name input
      animalName: ""   // Add a field for animal name
    }));
  } catch (error) {
    console.error("Error fetching submissions:", error);
    errorMessage.value = "Failed to fetch submissions.";
  }
});

// Re-fetch submissions after any update
async function fetchSubmissions() {
  try {
    const { data } = await axios.get(`${API_BASE}/api/animalSubmissions/pending`);
    submissions.value = data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    errorMessage.value = "Failed to fetch submissions.";
  }
}

// Start the naming process for the animal
function startNaming(submission) {
  submission.isNaming = true; // Show the input field
}

// Accept the submission and name the animal
async function acceptSubmission(submission) {
  if (submission.animalName.trim() === "") {
    errorMessage.value = "Please name the animal before accepting.";
    return;
  }

  try {
    await axios.post(`${API_BASE}/api/animalSubmissions/accept`, {
      submissionId: submission._id,
      animalName: submission.animalName // Send the name along with the acceptance
    });

    // Mark the submission as accepted and hide the naming input
    submission.isNaming = false;
    await fetchSubmissions(); // Re-fetch data from API
  } catch (error) {
    console.error("Error accepting submission:", error);
    errorMessage.value = "Failed to accept submission.";
  }
}

// Deny the submission
async function denySubmission(submission) {
  try {
    await axios.post(`${API_BASE}/api/animalSubmissions/deny`, {
      submissionId: submission._id
    });
    await fetchSubmissions(); // Re-fetch data from API
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

/* Admin Panel Layout */
.admin-container {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Title */
.title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Action Card Style */
.action-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s ease;
  margin: 20px;
}

.action-card h3 {
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #333;
}

.action-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.button {
  background-color: #6200ea;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 60%;
}

.button:hover {
  background-color: #3700b3;
}

/* Accept Button */
.button.accept {
  background-color: #4c7aaf;
}

.button.accept:hover {
  background-color: #388e3c;
}

/* Deny Button */
.button.deny {
  background-color: #f44336;
}

.button.deny:hover {
  background-color: #d32f2f;
}

/* Error message */
.text-red-600 {
  color: #f44336;
}
</style>