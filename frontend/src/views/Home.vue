// frontend/src/views/Home.vue - Styled with Google's Material 3 Design

<template>
  <div class="home-container">
    <header>
      <h1>No Stray Animals Ever</h1>
      <p>Dedicated to rescuing and caring for stray animals</p>
    </header>

    <section class="about-section">
      <h2>About Us</h2>
      <p>We locate, rescue, and provide safe shelter to stray animals. Our safari park houses over 3,000 animals, including dogs, cats, llamas, and more.</p>
    </section>

    <section class="volunteer-section">
      <h2>Become a Volunteer</h2>
      <p>Join us in our mission to provide shelter to stray animals. Sign up now and become part of our growing family!</p>
      <router-link to="/signup" class="home-button">Sign Up</router-link>
    </section>

    <section class="contact-section">
      <h2>Contact Us</h2>
      <p>Email: contact@nsanimals.org</p>
      <p>Location: 1 Main Street, Dreamland, DL 00000, Ultra Planet</p>
    </section>

    <footer>
      <p>© 2025 No Stray Animals Ever. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.home-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

header {
  background: #6200ea;
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
}

.about-section, .volunteer-section, .contact-section {
  background: #f9f9f9;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  margin-top: 10px;
}

.home-button:hover {
  background-color: #3700b3;
}

footer {
  margin-top: 2rem;
  font-size: 14px;
  color: #555;
}
</style>
