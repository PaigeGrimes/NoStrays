<template>
  <!-- Show the user info if it exists -->
  <h1>{{ accessLevel }}</h1>

  <button @click="logoutUser" class="logout-button">Logout</button>
</template>

<script setup>
// 1) Imports
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2) Set up router & refs
const router = useRouter()
const isAuthenticated = ref(true)


// We'll store the current user (as a string) in this ref
const currentUser = ref('')

// 3) Load the user from localStorage on mount
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    // If you saved just a username or userId directly in localStorage.setItem('user', 'JohnDoe'):
    currentUser.value = storedUser

    const accessLevel = user.accessLevel.value

    // If you stored a JSON object, for example:
    // localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe', email: '...' }))
    // Then do:
    // currentUser.value = JSON.parse(storedUser).username
  }
})

// 4) Define logoutUser
const logoutUser = () => {
  // Remove items from localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  // Update your reactive vars if needed
  isAuthenticated.value = false
  accessLevel.value = 0

  alert('Logged out successfully')
  router.push('/login')
}
</script>

<style scoped>
.logout-button {
  background-color: #b00020;
  color: white;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}

.logout-button:hover {
  background-color: #7b0015;
}

/* Optional styling for the "currently logged in" text */
.user-info {
  margin-bottom: 8px;
  font-weight: bold;
}
</style>
