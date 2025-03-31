<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="loginUser" class="auth-form">
      <label for="username" class="auth-label">Username</label>
      <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          class="auth-input"
      />

      <label for="password" class="auth-label">Password</label>
      <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          class="auth-input"
          autocomplete="on"
      />

      <button type="submit" class="auth-button">Login</button>
    </form>
    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const loginUser = async () => {
  errorMessage.value = ''; // Reset error message before making the request
  try {
    const userData = await login(username.value, password.value);

    if (userData) {
      // Store user data in localStorage to trigger navbar reactivity
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('accessLevel', userData.accessLevel);
      localStorage.setItem('username', userData.username);

      alert('Login successful');
      router.push('/dashboard'); // Redirect to the dashboard
    } else {
      errorMessage.value = 'Invalid login credentials'; // Display error message
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login. Please try again.'; // Catch any errors from the login function
  }
};
</script>



<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-label {
  margin-bottom: 5px;
  font-weight: bold;
}

.auth-input {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-button {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.auth-button:hover {
  background: #0056b3;
}

.error-text {
  color: red;
  margin-top: 10px;
}
</style>
