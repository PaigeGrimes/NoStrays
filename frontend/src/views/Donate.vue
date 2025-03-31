<template>
  <div class="donation-container">
    <h2 class="title">Make a Donation</h2>
    <p class="description">If you would like your donation to be anonymous, leave the name field blank.</p>

    <form @submit.prevent="donate" class="donation-form">
      <label for="name" class="label">Name (Optional):</label>
      <input v-model="name" type="text" placeholder="Your Name" class="input-field" />

      <label for="amount" class="label">Donation Amount:</label>
      <input
          :value="displayAmount"
          @input="handleInput($event.target.value)"
          @focus="focused = true"
          @blur="handleBlur"
          placeholder="$0.00"
          required
          class="input-field"
      />

      <label for="message" class="label">Message (Optional):</label>
      <textarea v-model="message" class="input-field no-resize" placeholder="Your Message"></textarea>

      <h3 class="payment-title">Payment Details</h3>

      <label for="ccNum" class="label">Credit Card Number:</label>
      <input v-model="ccNum" type="number" placeholder="XXXX XXXX XXXX XXXX" required class="input-field" />

      <label for="ccv" class="label">CCV:</label>
      <input v-model="ccv" type="number" placeholder="CCV" required class="input-field" />

      <label for="expire" class="label">Expiration Date:</label>
      <input v-model="expire" type="month" required class="input-field" />

      <label for="zip" class="label">Zip Code:</label>
      <input v-model="zip" type="number" placeholder="Zip Code" required class="input-field" />

      <button type="submit" class="donation-button">Donate Now</button>
    </form>

    <img :src="thankYouImage" alt="Thank You Image" class="thank-you-image" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import confetti from 'canvas-confetti';
import thankYouImage from "@/assets/sad.png";

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
    const res = await axios.post(`${API}/donation`, {
      name: name.value,
      amount: numericAmount.value,
      message: message.value,
      ccNum: ccNum.value,
      ccv: ccv.value,
      ccExpiration: expire.value,
      zipCode: zip.value,
    });

    if (res.data.success) {
      alert(`${res.data.message}\nYou're AMAZING!`);
      throwConfetti();
    } else {
      alert('Donation failed. Please try again.');
    }
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

/* Container */
.donation-container {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Title and Description */
.title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
}

/* Form */
.donation-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

.label {
  font-size: 1rem;
  color: #333;
  text-align: left;
  width: 100%;
}

/* Input fields */
.input-field {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  background: #fff;
  margin-bottom: 1rem;
}

.input-field:focus {
  border-color: #2c3e50;
  outline: none;
}

/* No resize for textarea */
.no-resize {
  resize: none;
}

/* Payment section */
.payment-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
}

/* Donation button */
.donation-button {
  background-color: #2c3e50;
  color: white;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 1.5rem;
}

.donation-button:hover {
  background-color: #2c3e50;
}

/* Thank You Image */
.thank-you-image {
  width: 80%;
  max-width: 300px;
  margin-top: 2rem;
}
</style>
