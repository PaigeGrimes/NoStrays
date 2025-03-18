<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const donations = ref([]);
const selectedUser = ref(null);
const newAccessLevel = ref('');
const message = ref('');

// Fetch users and donations from the server
const fetchHRData = async () => {
  try {
    const res = await fetch('http://localhost:5001/hr');
    const data = await res.json();
    users.value = data.users;
    donations.value = data.donations;
  } catch (err) {
    console.error('Failed to fetch HR data:', err);
  }
};

// Update user access level
const updateUserAccess = async () => {
  if (!selectedUser.value || !newAccessLevel.value) {
    message.value = 'Please select a user and enter a new access level.';
    return;
  }

  try {
    const res = await fetch('http://localhost:5001/update-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: selectedUser.value._id,
        accessLevel: newAccessLevel.value
      })
    });

    const data = await res.json();
    message.value = data.message;

    if (res.ok) {
      alert('Access level updated successfully!');
      fetchHRData(); // Refresh user list
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error('Failed to update access level:', err);
    message.value = 'Failed to update access level.';
  }
};

// Fetch HR data on mount
onMounted(fetchHRData);
</script>

<template>
  <div>
    <h2>Manage User Access</h2>

    <label>Select User:</label>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user._id" :value="user">
        {{ user.name }} - ({{ user.accessLevel }})
      </option>
    </select>

    <label>New Access Level:</label>
    <input v-model="newAccessLevel" placeholder="Enter new access level" />

    <button @click="updateUserAccess">Update Access</button>

    <p>{{ message }}</p>

    <h2>Recent Donations</h2>
    <ul>
      <li v-for="donation in donations" :key="donation._id">
        <strong>{{ donation.name }}</strong>: ${{ donation.amount }} - "{{ donation.message }}"
      </li>
    </ul>
  </div>
</template>

<style scoped>
select, input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
  width: 200px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
p {
  color: green;
  margin-top: 10px;
}
</style>
