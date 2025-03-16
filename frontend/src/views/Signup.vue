<template>
  <div class="auth-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup" class="auth-form">
      <label>Full Name</label>
      <input v-model="name" type="text" placeholder="Enter your full name" required class="auth-input" />

      <label>Email</label>
      <input v-model="email" type="email" placeholder="Enter your email" required class="auth-input" />

      <label>Password</label>
      <input v-model="password" type="password" placeholder="Enter your password" required class="auth-input" />

      <button type="submit" class="auth-button" @click="testClick">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/" class="auth-link">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

// ✅ Debugging: Ensure button click is detected
const testClick = () => {
  console.log("Signup button clicked!");
};

const handleSignup = async () => {
  console.log("Attempting signup with:", name.value, email.value, password.value);

  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, password: password.value, role: 'volunteer' })
    });

    const data = await res.json();
    console.log("Signup Response:", data);

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      alert(data.msg);
    }
  } catch (err) {
    console.error('Signup failed:', err);
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
