<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref(null);

const animalName = ref('');
const animalSpecies = ref('');
const removeAnimalId = ref('');

const targetUsername = ref('');
const newAccessLevel = ref(3);
const deleteUsername = ref('');

onMounted(async () => {
  // Check if user is logged in and has admin access
  const userId = localStorage.getItem('userId');
  const accessLevel = parseInt(localStorage.getItem('accessLevel') || '0');

  if (!userId || accessLevel < 3) {
    alert('You do not have permission to access this page.');
    router.push('/'); // Redirect to home or login
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
      username: currentUser.value.username, // needed for ensureAdmin
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
      data: { username: currentUser.value.username } // pass user for ensureAdmin
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
      username: currentUser.value.username, // admin check
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
      data: { username: currentUser.value.username } // pass user for ensureAdmin
    });
    alert('User deleted!');
    deleteUsername.value = '';
  } catch (err) {
    console.error(err);
    alert('Failed to delete user');
  }
}
</script>

<template>
  <div>
    <h2>Admin Panel</h2>
    <div>
      <h3>Add Animal</h3>
      <input v-model="animalName" placeholder="Animal Name" />
      <input v-model="animalSpecies" placeholder="Species" />
      <button @click="addAnimal">Add Animal</button>
    </div>

    <div>
      <h3>Remove Animal</h3>
      <input v-model="removeAnimalId" placeholder="Animal ID" />
      <button @click="removeAnimal">Remove Animal</button>
    </div>

    <div>
      <h3>Update User Role</h3>
      <input v-model="targetUsername" placeholder="Target Username" />
      <select v-model="newAccessLevel">
        <option value="1">Volunteer</option>
        <option value="2">Caregiver</option>
        <option value="3">Board</option>
        <option value="4">CEO</option>
      </select>
      <button @click="updateRole">Update Role</button>
    </div>

    <div>
      <h3>Delete User</h3>
      <input v-model="deleteUsername" placeholder="Username to delete" />
      <button @click="deleteUser">Delete User</button>
    </div>
  </div>
</template>

<style scoped>
/* Apply Material 3 styling as needed */
</style>
