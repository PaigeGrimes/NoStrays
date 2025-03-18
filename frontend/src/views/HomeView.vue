<template>
  <div class="home-container">
    <header class="home-header">
      <h1>No Stray Animals Ever</h1>
      <p>Dedicated to rescuing and caring for stray animals in need.</p>
    </header>

    <section class="home-section about">
      <img src="@/assets/sad.png" alt="Sad Animal" class="sad-animal" />
      <h2>Our Mission</h2>
      <p>We locate, rescue, and provide safe shelter to stray animals across Ultra Planet. Our Safari Park can accommodate 3,000+ animals, ranging from cats and dogs to llamas, tigers, and more.</p>
    </section>

    <section class="home-section cta">
      <h2>Join Us</h2>
      <p>Whether you’re a volunteer or a donor, your support helps ensure every animal has the care they deserve.</p>
      <router-link to="/signup" class="home-button">Sign Up</router-link>
      <router-link to="/donate" class="home-button donate-button">Donate</router-link>
    </section>

    <section class="home-section contact">
      <h2>Contact Us</h2>
      <p>Email: contact@nsanimals.org</p>
      <p>Address: 1 Main Street, Dreamland, DL 00000, Ultra Planet</p>
      <p>Phone: (123) 456-7890</p>
    </section>

    <footer class="home-footer">
      <p>© 2025 No Stray Animals Ever. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.home-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.home-header {
  background: #6200ea;
  color: white;
  padding: 1.5rem;
  border-radius: 12px 12px 0 0;
}

.home-section {
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sad-animal {
  width: 40%;
  max-width: 300px;
  margin: 1rem auto;
  display: block;
  border-radius: 8px;
}

.home-button {
  display: inline-block;
  background-color: #6200ea;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  margin: 1rem;
}

.home-button:hover {
  background-color: #3700b3;
}

.donate-button {
  background-color: #e91e63;
}

.donate-button:hover {
  background-color: #c2185b;
}

.home-footer {
  margin-top: 2rem;
  font-size: 14px;
  color: #555;
}
</style>
