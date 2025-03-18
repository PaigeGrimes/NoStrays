<template>
  <div class="bg-surface p-6 shadow-lg rounded-3xl flex items-center space-x-6">
    <!-- A fixed-size container with inline style -->
    <div
        style="
        width: 96px;
        height: 96px;
        border-radius: 9999px;
        overflow: hidden;
      "
    >
      <!-- The image fills the container exactly -->
      <img
          :src="image"
          :alt="name"
          style="
          width: 100%;
          height: 100%;
          object-fit: cover;
        "
      />
    </div>

    <div>
      <h4 class="text-xl font-semibold text-on-surface">{{ name }}</h4>
      <p class="text-on-surface-variant">{{ title }}</p>
      <p class="text-sm text-on-surface-variant mt-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  title: String,
  description: String,
  image: String,
});
</script>
