<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"; // Import useRoute to check active route
import AppMenuItem from "./AppMenuItem.vue";
import {getUser, logout} from "@/auth";  // Import the getUser function

const router = useRouter();
const route = useRoute();  // Get the current route
const user = ref(null);  // Initialize as null to check if it's loaded

// Fetch the user data from the API when the component is mounted
onMounted(async () => {
  user.value = await getUser();  // Fetch user data from the backend
});

const handleLogout = async () => {
  await logout();
  await router.push('/login'); // Redirect to login after logout
};

const model = ref([
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-home",
    to: "/dashboard",
  },
  {
    label: "Volunteer",
    icon: "pi pi-fw pi-users",
    to: "/volunteer",
    visible: () => user.value?.accessLevel >= 1,
  },
  {
    label: "Animals",
    icon: "pi pi-fw pi-paw",
    to: "/animals",
    visible: () => user.value?.accessLevel >= 1,
  },
  {
    label: "Caregiver",
    icon: "pi pi-fw pi-paw",
    to: "/caregiver",
    visible: () => user.value?.accessLevel >= 2,
  },
  {
    label: "Board Member",
    icon: "pi pi-fw pi-briefcase",
    to: "/boardMember",
    visible: () => user.value?.accessLevel >= 4,
  },
  {
    label: "Admin",
    icon: "pi pi-fw pi-cog",
    to: "/admin",
    visible: () => user.value?.accessLevel === 5,
  },
]);

// Watch for changes in the user to update menu visibility
watch(user, () => {
  if (user.value) {
    // Recalculate model based on the user data
    model.value = [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        to: "/dashboard",
      },
      {
        label: "Volunteer",
        icon: "pi pi-fw pi-users",
        to: "/volunteer",
        visible: () => user.value?.accessLevel >= 1,
      },
      {
        label: "Animals",
        icon: "pi pi-fw pi-paw",
        to: "/animals",
        visible: () => user.value?.accessLevel >= 2,
      },
      {
        label: "Caregiver",
        icon: "pi pi-fw pi-paw",
        to: "/caregiver",
        visible: () => user.value?.accessLevel >= 2,
      },
      {
        label: "Board Member",
        icon: "pi pi-fw pi-briefcase",
        to: "/boardMember",
        visible: () => user.value?.accessLevel >= 4,
      },
      {
        label: "Admin",
        icon: "pi pi-fw pi-cog",
        to: "/admin",
        visible: () => user.value?.accessLevel === 5,
      },
    ];
  }
});

</script>

<template>
  <ul v-if="user" class="layout-menu">  <!-- Ensure user is loaded before rendering the menu -->
    <template v-for="(item, i) in model" :key="i">
      <AppMenuItem v-if="!item.separator && (!item.visible || item.visible())" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>

</template>

<style lang="scss" scoped>
/* ========== SIDEBAR MENU STYLING ========== */

.layout-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.layout-menu li {
  padding: 10px 20px;
  font-size: 16px; /* Adjust font size for better readability */
  font-weight: 500;
}

.layout-menu li:hover {
  background-color: #f3efef; /* Subtle background change on hover */
  color: #000000; /* Change text color to white on hover */
  cursor: pointer;
  border-radius: 4px; /* Slight rounding for a more modern look */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition effect */
  width: 50%;
}

.menu-separator {
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
}

/* Styling for each menu item */
.layout-menu li a {
  text-decoration: none;
  color: #bbb; /* Light gray text for unhovered links */
  display: block;
  padding: 10px;
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
}


/* Additional menu item styles */
.layout-menu li .active {
  background-color: #3700b3; /* Darker color for active items */
  color: white;
}

</style>

