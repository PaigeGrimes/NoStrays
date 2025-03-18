<template>
  <div class="admin-container">
    <h2 class="title">Admin Panel</h2>

    <div class="card">
      <h3>Add Animal</h3>
      <div class="input-group">
        <input v-model="animalName" type="text" placeholder="Animal Name" class="input" />
        <input v-model="animalSpecies" type="text" placeholder="Species" class="input" />
      </div>
      <button @click="addAnimal" class="button">Add Animal</button>
    </div>

    <div class="card">
      <h3>Remove Animal</h3>
      <input v-model="removeAnimalId" type="text" placeholder="Animal ID" class="input" />
      <button @click="removeAnimal" class="button">Remove Animal</button>
    </div>

    <div class="card">
      <h3>Update User Role</h3>
      <input v-model="targetUsername" type="text" placeholder="Target Username" class="input" />
      <select v-model="newAccessLevel" class="select">
        <option value="1">Volunteer</option>
        <option value="2">Caregiver</option>
        <option value="3">Board</option>
        <option value="4">CEO</option>
      </select>
      <button @click="updateRole" class="button">Update Role</button>
    </div>

    <div class="card">
      <h3>Delete User</h3>
      <input v-model="deleteUsername" type="text" placeholder="Username to delete" class="input" />
      <button @click="deleteUser" class="button delete">Delete User</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const router = useRouter();
const currentUser = ref(null);

const animalName = ref('');
const animalSpecies = ref('');
const removeAnimalId = ref('');

const targetUsername = ref('');
const newAccessLevel = ref(3);
const deleteUsername = ref('');

onMounted(async () => {
  const userId = localStorage.getItem('userId');
  const accessLevel = parseInt(localStorage.getItem('accessLevel') || '0');

  if (!userId || accessLevel < 3) {
    alert('You do not have permission to access this page.');
    router.push('/');
    return;
  }

  try {
    const response = await axios.get(`http://localhost:5001/api/users/${userId}`);
    currentUser.value = response.data;
  } catch (err) {
    console.error(err);
    alert('Failed to fetch user data');
  }
});

async function addAnimal() {
  try {
    await axios.post('http://localhost:5001/api/animals', {
      username: currentUser.value.username,
      name: animalName.value,
      species: animalSpecies.value
    });
    alert('Animal added!');
    animalName.value = '';
    animalSpecies.value = '';
  } catch (err) {
    console.error(err);
    alert('Failed to add animal');
  }
}

async function removeAnimal() {
  try {
    await axios.delete(`http://localhost:5001/api/animals/${removeAnimalId.value}`, {
      data: {username: currentUser.value.username}
    });
    alert('Animal removed!');
    removeAnimalId.value = '';
  } catch (err) {
    console.error(err);
    alert('Failed to remove animal');
  }
}

async function updateRole() {
  try {
    await axios.put('http://localhost:5001/api/users/role', {
      username: currentUser.value.username,
      targetUsername: targetUsername.value,
      newAccessLevel: parseInt(newAccessLevel.value)
    });
    alert('User role updated!');
    targetUsername.value = '';
    newAccessLevel.value = 3;
  } catch (err) {
    console.error(err);
    alert('Failed to update user role');
  }
}

async function deleteUser() {
  try {
    await axios.delete(`http://localhost:5001/api/users/${deleteUsername.value}`, {
      data: {username: currentUser.value.username}
    });
    alert('User deleted!');
    deleteUsername.value = '';
  } catch (err) {
    console.error(err);
    alert('Failed to delete user');
  }
}
</script>

<style scoped>
/* Material Design 3 Styling */
.admin-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-align: center;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.input,
.select {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s;
}

.input:focus,
.select:focus {
  border-color: #6200ea;
  outline: none;
}

.button {
  background-color: #6200ea;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
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
</style>
