<template>
    <div class="container">
    <form @submit.prevent="register">
      <label for="name">Name:</label>
      <input v-model="name" placeholder="Name" required />
      <label for="age">Age:</label>
      <input v-model="age" type="number" placeholder="Age" required />
      <label for="town">Town:</label>
      <input v-model="town" placeholder="Town" required />
      <label for="hobby">Hobby:</label>
      <input v-model="hobby" placeholder="Hobby" />
      <label for="bio">Short bio:</label>
      <textarea v-model="bio" placeholder="Bio"></textarea>

      <button type="submit">Sign Up</button>
    </form>
      <img :src="volunteerURL" alt="Vue" />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import volunteerURL from "@/assets/volunteer.jpg";
import { defineComponent } from 'vue';
export default defineComponent( {
  computed: {
    volunteerURL() {
      return volunteerURL
    }
  },
  data() {
    return {
      name: '',
      age: '',
      hobby: '',
      town: '',
      bio: '',
    };
  },
  methods: {
    async register() {
      try {
        const res = await axios.post('http://localhost:5001/register', {
          name: this.name,
          age: this.age,
          hobby: this.hobby,
          town: this.town,
          bio: this.bio,
        });

        alert(`User registered successfully. Your unique code is: ${res.data.code}`);
      } catch (error) {
        console.error('Registration failed', error);
        alert('Error during registration');
      }
    },
  },
});
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: auto 20px;
}
/* Style the form */
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto 20px;
}

div {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.2rem;
}

button {
  padding: 0.7rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
}


  img {
    max-width: 50%;

  }

</style>