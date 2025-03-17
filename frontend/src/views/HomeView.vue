<template>

  <div id="container">
    <h1>No Stray Animals Ever</h1>

    <hr />
    <p>2 Park Street, Dreamland, DL, 00000, ULTRA PLANET</p>
    <br/>
    <h2>Meet the Team</h2>
    <p>lorem ipsum </p>
    <p>lorem ipsum</p>
    <br/>
    <br/>
    <br/>
    <br/>
    <hr/>
    <footer>
      <p>Thank you <em>Nature and Us</em>, <em>Pollution Extactor</em>, and <em>Save the Planet for all that you do :)</em></p>
    <img style="width: 5rem" :src="usURL" alt="Vue" />
    <img style="width: 5rem" :src="polURL" alt="Vue" />
    <img style="width: 5rem" :src="planetURL" alt="Vue" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import usURL from '../assets/nature_and_us.png'
import polURL from '../assets/pollution_extractor.png'
import planetURL from '../assets/save_the_planet.png'
</script>
<style scoped>
/* Style the form */
#container {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 50px;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.2rem;
}

button {
  padding: 0.7rem;
  background-color: #4caf50;
  color: #000000;
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
  border-radius: 50%;
  margin-top: 1rem;
  border: solid 1px #000000;
}
</style>