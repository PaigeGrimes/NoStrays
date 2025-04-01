<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- Animals Card -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Animals</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ animalsCount }}</div>
          </div>
          <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-paw text-green-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Card -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Users</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ usersCount }}</div>
          </div>
          <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-cyan-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Donations Count Card -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Donations</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ donationsCount }}</div>
          </div>
          <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-heart text-purple-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Donations Amount Card -->
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Total Donations</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">${{ donationsTotal }}</div>
          </div>
          <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-orange-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const animalsCount = ref(0);
const usersCount = ref(0);
const donationsCount = ref(0);
const donationsTotal = ref(0);

const apiBase = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => {
  // Fetch animals and count them
  try {
    const response = await axios.get(`${apiBase}/animals`);
    animalsCount.value = Array.isArray(response.data) ? response.data.length : 0;
  } catch (error) {
    console.error('Error fetching animals:', error);
  }

  // Fetch users and count them
  try {
    const response = await axios.get(`${apiBase}/users`);
    usersCount.value = Array.isArray(response.data) ? response.data.length : 0;
  } catch (error) {
    console.error('Error fetching users:', error);
  }

  // Fetch donations, count them, and calculate total amount
  try {
    const response = await axios.get(`${apiBase}/donations`);
    if (Array.isArray(response.data)) {
      donationsCount.value = response.data.length;
      donationsTotal.value = response.data
          .reduce((sum, donation) => sum + (donation.amount || 0), 0)
          .toFixed(2);
    }
  } catch (error) {
    console.error('Error fetching donations:', error);
  }
});
</script>
