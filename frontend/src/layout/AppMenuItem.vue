<template>
  <li :class="{'menu-item': true, 'active': isActive}">
    <router-link v-if="item.to" :to="item.to" class="menu-link">
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </router-link>

    <template v-else>
      <span>
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </span>
    </template>

    <!-- Submenu -->
    <ul v-if="item.items && item.items.length > 0">
      <app-menu-item
          v-for="(subItem, idx) in item.items"
          :key="idx"
          :item="subItem"
          :index="idx" />
    </ul>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: Object,
  index: Number,
});

const isActive = false; // You can implement active state logic if needed.
</script>

<style scoped>
.menu-item {
  list-style: none;
}

.menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.menu-link i {
  margin-right: 10px;
}

.menu-item.active > .menu-link {
  font-weight: bold;
}
</style>
