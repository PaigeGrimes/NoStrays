<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <div class="admin-container">
      <h2 class="title">Admin Panel</h2>

      <!-- Tabs for different actions -->
      <div class="tabs">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tab-button', { active: activeTab === index }]"
            @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Add User Tab -->
        <div v-show="activeTab === 0" class="action-card">
          <h3>Add User</h3>
          <div class="input-group">
            <input v-model="newUsername" type="text" placeholder="Username" class="input" />
            <input v-model="newPassword" type="password" placeholder="Password" class="input" />
            <input v-model="newName" type="text" placeholder="Name" class="input" />
            <input v-model="newAge" type="number" placeholder="Age" class="input" />
            <input v-model="newTown" type="text" placeholder="Town" class="input" />
          </div>
          <button @click="addUser" class="button">Add User</button>
        </div>

        <!-- Update User Role Tab -->
        <div v-show="activeTab === 1" class="action-card">
          <h3>Update User Role</h3>
          <input v-model="targetUsername" type="text" placeholder="Target Username" class="input" />
          <select v-model="newAccessLevel" class="select">
            <option value="1">Volunteer</option>
            <option value="2">Caregiver</option>
            <option value="3">Head Caregiver</option>
            <option value="4">Board</option>
            <option value="5">CEO</option>
            <option value="6">HR</option>
          </select>
          <button @click="updateRole" class="button">Update Role</button>
        </div>

        <!-- Delete User Tab -->
        <div v-show="activeTab === 2" class="action-card">
          <h3>Delete User</h3>
          <input v-model="deleteUsername" type="text" placeholder="Username to delete" class="input" />
          <button @click="deleteUser" class="button delete">Delete User</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Sidebar from '@/layout/AppSidebar.vue';

const router = useRouter();

// Active tab (0 = Add User, 1 = Update Role, 2 = Delete User)
const activeTab = ref(0);

// Tabs names
const tabs = ['Add User', 'Update User Role', 'Delete User'];

// Reactive data for adding a user
const newUsername = ref('');
const newPassword = ref('');
const newName = ref('');
const newAge = ref('');
const newTown = ref('');
const newHobby = ref('');
const newBio = ref('');

// Reactive data for updating roles
const targetUsername = ref('');
const newAccessLevel = ref(3);

// Reactive data for deleting a user
const deleteUsername = ref('');
// Add User function
async function addUser() {
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUsername.value,
        password: newPassword.value,
        name: newName.value,
        age: newAge.value,
        hobby: newHobby.value,
        town: newTown.value,
        bio: newBio.value
      })
    });
    alert('User added!');
    newUsername.value = '';
    newPassword.value = '';
    newName.value = '';
    newAge.value = '';
    newTown.value = '';
    newHobby.value = '';    // Reset this field
    newBio.value = '';      // Reset this field
  } catch (err) {
    console.error(err);
    alert('Failed to add user');
  }
}

async function updateRole() {
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/update-access`, {
      username: targetUsername.value,
      newAccessLevel: parseInt(newAccessLevel.value)
    });
    alert('User role updated!');
    targetUsername.value = '';
    newAccessLevel.value = 3;
  } catch (err) {
    console.error(err);
    alert('Failed to update user role.\nMake sure the username is correct.');
  }
}

// Delete User function
async function deleteUser() {
  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${deleteUsername.value}`);
    alert('User deleted!');
    deleteUsername.value = '';
  } catch (err) {
    console.error(err);
    alert('Failed to delete user');
  }
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

/* Tabs */
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
}

.tab-button {
  background: transparent;
  padding: 12px 24px;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  font-weight: 500;
}

.tab-button.active {
  border-color: #6200ea;
  color: #6200ea;
  background: #f3e5f5;
}

.tab-button:hover {
  background: #f3e5f5;
  color: #6200ea;
}

/* Tab Content */
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Action Card Style */
.action-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.action-card h3 {
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #333;
}

.input-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
}

.input, .select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.input:focus, .select:focus {
  border-color: #6200ea;
  background-color: #f3e5f5;
  outline: none;
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
}

.button:hover {
  background-color: #3700b3;
}

.delete {
  background-color: #b00020;
}

.delete:hover {
  background-color: #7b0015;
}

/* Hover Effect on Action Card */
.action-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>

