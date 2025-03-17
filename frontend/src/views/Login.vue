<template>
<div class="login-container">
 <h2>Login</h2>
 <form @submit.prevent="loginUser">
   <label for="username">Username:</label>
   <input v-model="username" placeholder="Username" required />

   <label for="password">Password:</label>
   <input v-model="password" type="password" placeholder="Password" required />

   <button type="submit">Login</button>
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
     
     // Example usage: store user ID & other data in localStorage
     localStorage.setItem('userId', response.data.userId);
     localStorage.setItem('accessLevel', response.data.accessLevel);

     alert('Logged in successfully');
     // Redirect to message area or wherever
   } catch (error: any) {
     console.error('Login failed:', error);
     alert(error.response?.data?.message || 'Login failed');
   }
 },
},
});
</script>

<style scoped>
/* Style to your heart’s content */
</style>
