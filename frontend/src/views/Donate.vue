<template>
  <div class="donation-container">
    <h2>Make a Donation</h2>
    <p>If you would like your donation to be anonymous, leave the name field blank.</p>

    <form @submit.prevent="donate" class="donation-form">
      <label for="name">Name:</label>
      <input v-model="name" type="text" placeholder="Your Name (Optional)" class="input-field" />

      <label for="amount">Donation Amount:</label>
      <input
          :value="displayAmount"
          @input="handleInput($event.target.value)"
          @focus="focused = true"
          @blur="handleBlur"
          placeholder="$0.00"
          required
          class="input-field"
      />

      <label for="message">Message:</label>
      <textarea v-model="message" class="input-field no-resize" placeholder="Your Message (Optional)"></textarea>

      <h3>Payment Details</h3>
      <label for="ccNum">Credit Card Number:</label>
      <input v-model="ccNum" type="number" placeholder="XXXX XXXX XXXX XXXX" required class="input-field" />

      <label for="ccv">CCV:</label>
      <input v-model="ccv" type="number" placeholder="CCV" required class="input-field" />

      <label for="expire">Expiration Date:</label>
      <input v-model="expire" type="month" required class="input-field" />

      <label for="zip">Zip Code:</label>
      <input v-model="zip" type="number" placeholder="Zip Code" required class="input-field" />

      <button type="submit" class="donation-button" @click="throwConfetti">Donate Now</button>
    </form>

    <img :src="sadURL" alt="Thank You Image" class="thank-you-image" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import confetti from 'canvas-confetti';
import sadURL from "@/assets/sad.png";

const name = ref('');
const message = ref('');
const ccNum = ref('');
const ccv = ref('');
const expire = ref('');
const zip = ref('');
const numericAmount = ref(0);
const rawInput = ref('');
const focused = ref(false);

const displayAmount = computed(() => {
  if (focused.value) {
    return rawInput.value;
  } else {
    if (!numericAmount.value) return '';
    return numericAmount.value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  }
});

function handleInput(value) {
  let cleaned = value.replace(/[^0-9.]/g, '');
  if (cleaned.startsWith(".")) cleaned = "0" + cleaned;
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts.shift() + '.' + parts.join('');
  }
  if (parts[1]?.length > 2) {
    parts[1] = parts[1].slice(0, 2);
    cleaned = parts.join('.');
  }
  rawInput.value = cleaned;
  numericAmount.value = parseFloat(cleaned) || 0;
}

function handleBlur() {
  focused.value = false;
}

async function donate() {
  try {
    const res = await axios.post('http://localhost:5001/donation', {
      name: name.value,
      amount: numericAmount.value,
      message: message.value,
      ccNum: ccNum.value,
      ccv: ccv.value,
      ccExpiration: expire.value,
      zipCode: zip.value,
    });
    alert(`${res.data.message}\nYou're AMAZING!`);
    throwConfetti();
  } catch (error) {
    console.error('Donation failed', error);
    alert('Error during donation. Please try again.');
  }
}

function throwConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };
  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    }));
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.donation-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.donation-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.no-resize {
  resize: none;
}

.donation-button {
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

.donation-button:hover {
  background-color: #3700b3;
}

.thank-you-image {
  width: 80%;
  max-width: 300px;
  margin-top: 20px;
}
</style>
