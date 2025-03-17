<template>
  <div class="auth-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup" class="auth-form">
      <label>Username</label>
      <input v-model="username" type="text" placeholder="Enter your username" required class="auth-input" />

      <label>Full Name</label>
      <input v-model="name" type="text" placeholder="Enter your full name" required class="auth-input" />

      <label>Age</label>
      <input v-model="age" type="number" placeholder="Enter your age" required class="auth-input" />

      <label>Hobby</label>
      <input v-model="hobby" type="text" placeholder="Enter your hobby" class="auth-input" />

      <label>Town</label>
      <input v-model="town" type="text" placeholder="Enter your town" required class="auth-input" />

      <label>Bio</label>
      <textarea v-model="bio" placeholder="Tell us about yourself" class="auth-input"></textarea>

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

const username = ref('');
const name = ref('');
const age = ref('');
const hobby = ref('');
const town = ref('');
const bio = ref('');
const password = ref('');

const router = useRouter();

// Debugging: Ensure button click is detected
const testClick = () => {
  console.log("Signup button clicked!");
};

const handleSignup = async () => {
  console.log("Attempting signup with:", username.value, name.value, age.value, hobby.value, town.value, bio.value, password.value);

  try {
    const res = await fetch('http://localhost:5001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        name: name.value,
        age: age.value,
        hobby: hobby.value,
        town: town.value,
        bio: bio.value
      })
    });

    const data = await res.json();
    console.log("Signup Response:", data);

    if (res.ok) {
      alert(`${data.message}. Your registration code is: ${data.code}`);
      router.push('/'); // Redirect to login page
    } else {
      alert(data.message);
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
  width: 92%;
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
