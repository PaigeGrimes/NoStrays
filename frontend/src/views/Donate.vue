<template>
  <div class="container">
    <form @submit.prevent="donate">
      <pre>If you would like your donation to be anonymous, leave the name field blank.</pre>
      <label for="name">Name:</label>
      <input v-model="name" placeholder="Name" />
      <label for="amount">Donation Amount:</label>
      <input v-model="amount" type="number" step="1000" placeholder="$ Amount" required />
      <label style="white-space: pre-line;" for="message">Message:</label>
      <textarea v-model="message" placeholder="Message"></textarea>
      <label for="ccNum">Credit Card Number:</label>
      <input v-model="ccNum" type="number" placeholder="XXXX XXXX XXXX XXXX" required />
      <label for="ccv">CCV:</label>
      <input v-model="ccv" type="number" placeholder="CCV" required />
      <label for="expire">Expiration Date:</label>
      <input v-model="expire" type="month" placeholder="Expiration Date" required />
      <label for="zip">Zip Code:</label>
      <input v-model="zip" type="number" placeholder="Zip" required />

      <button type="submit" @click="throwConfetti">Sign Up</button>
    </form>
    <img :src="sadURL" alt="Vue" />
  </div>
</template>

<script lang="ts">

import axios from 'axios';
import confetti from 'canvas-confetti';
import { defineComponent } from 'vue';
import usURL from "@/assets/nature_and_us.png";
import sadURL from "@/assets/sad.png";

export default defineComponent ({
  computed: {
    sadURL() {
      return sadURL
    },
  },
  data() {
    return {
      name: '',
      amount: '',
      message: '',
      ccNum: '',
      ccv: '', // Added to the request
      expire: '',
      zip: '',
    };
  },
  methods: {
    async donate() {
      try {
        const res = await axios.post('http://localhost:5001/donation', {
          name: this.name,
          amount: this.amount,
          message: this.message,
          ccNum: this.ccNum,
          ccv: this.ccv,  // Fixed missing CCV
          ccExpiration: this.expire, // Ensure it matches the backend field
          zipCode: this.zip, // Ensure it matches the backend field
        });

        // Display success message from server response
        alert(`${res.data.message}\nYou're AMAZING!`);
      } catch (error) {
        console.error('Donation failed', error);
        alert('Error during donation. Please try again.');
      }
    },
  throwConfetti() {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
      };

      function fire(particleRatio: number, opts: any) {
        confetti(
            Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio),
            })
        );
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
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

form {
  display: flex;
  flex-direction: column;
  width: 40%; /* Adjust this width as needed */
  margin-right: 20px; /* Space between the form and image */
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
  position: relative;
  z-index: 10;
  background-color: #ffffff;
  margin: 1rem;
  padding: 0.5rem;
  width: 50%;
  align-content: center;
}

img {
  width: 40%; /* Adjust image size as needed */
}

i {
  animation: confetti-animation 2s forwards;
}

@keyframes confetti-animation {
  to {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
}
</style>