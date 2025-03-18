<template>
  <div class="bg-surface shadow-lg rounded-3xl p-6 text-center">
    <h3 class="text-4xl font-bold text-primary">{{ title }}</h3>
    <p class="text-lg text-on-surface-variant mt-2">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
});
</script>
