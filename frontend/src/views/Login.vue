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
      />

      <button type="submit" class="auth-button">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:5001/login', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('accessLevel', response.data.accessLevel);

        alert('Logged in successfully');
        this.$router.push('/')
      } catch (error: any) {
        console.error('Login failed:', error);
        alert(error.response?.data?.message || 'Login failed');
      }
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

/* Container styled as a "card" */
.auth-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
}

/* Form layout */
.auth-form {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

/* Labels above each input */
.auth-label {
  text-align: left;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Inputs with subtle background color and round corners */
.auth-input {
  width: 92%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: none;
  border-radius: 12px;
  background-color: #f1f5fe; /* Light bluish background */
  font-size: 16px;
  outline: none;
  box-shadow: inset 0 0 0 1px #ddd;
  transition: box-shadow 0.3s ease;
}

/* Highlight border on focus */
.auth-input:focus {
  box-shadow: inset 0 0 0 2px #6200ea;
}

/* Button with Material 3–inspired styling */
.auth-button {
  background-color: #6200ea;
  color: #fff;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #3700b3;
}
</style>
