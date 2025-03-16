<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="auth-form">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="Enter your email" required class="auth-input" />

      <label>Password</label>
      <input v-model="password" type="password" placeholder="Enter your password" required class="auth-input" />

      <button type="submit" class="auth-button" @click="testClick">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup" class="auth-link">Sign Up</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

// ✅ Debugging: Ensure button click is detected
const testClick = () => {
  console.log("Login button clicked!");
};

const handleLogin = async () => {
  console.log("Attempting login with:", email.value, password.value);

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const data = await res.json();
    console.log("Login Response:", data);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      alert(data.msg);
    }
  } catch (err) {
    console.error('Login failed:', err);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.auth-button {
  background-color: #6200ea;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

.auth-button:hover {
  background-color: #3700b3;
}

.auth-link {
  color: #6200ea;
  text-decoration: none;
}
</style>
