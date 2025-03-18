<template>
  <div>
    <Navbar />
    <logoutbutton />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import logoutbutton from './components/logoutbutton.vue';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}
</style>
