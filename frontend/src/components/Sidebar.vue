<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">


    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/about" class="button">
        <span class="material-icons">description</span>
        <span class="text">Volunteer</span>
      </router-link>
      <router-link to="/donation" class="button">
        <span class="material-icons">description</span>
        <span class="text">Donate</span>
      </router-link>
      <router-link to="/login" class="button">
        <span class="material-icons">login</span>
        <span class="text">Login</span>
      </router-link>
      <router-link to="/messages" class="button">
        <span class="material-icons">message</span>
        <span class="text">Messages</span>
      </router-link>

    </div>

    <div class="flex"></div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import safariURL from '../assets/safari.jpg'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: #f1f5f9;
  color: #000000;

  width: 400px;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: fit-content;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: #000000;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color:#000000;
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3, .button .text {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: #000000;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: #000000;
        transition: 0.2s ease-in-out;
      }
      .text {
        color: #000000;
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-image: url("../assets/safari.jpg");
        background-size: cover;
        background-repeat: no-repeat;

        .material-icons, .text {
          color: #000000;
          font-weight: bolder;
        }
      }

      &.router-link-exact-active {
        background-color: #f1f5f9;
        border-right: 5px solid #f1f5f9;

        .material-icons, .text {
          color: #000000;
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: #000000;
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3, .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>