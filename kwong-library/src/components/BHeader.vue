<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li v-if="isAuthenticated == 'false'" class="nav-item">
          <router-link to="/access-denial" class="nav-link" active-class="active">About</router-link>
        </li>
        <li v-else-if="isAuthenticated == 'true'" class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li v-if="isAuthenticated == 'false'" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">LogIn(Week6)</router-link>
        </li>
        <li v-else-if="isAuthenticated == 'true'" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active" @click="logOut">LogOut</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-book" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogout" class="nav-link" active-class="active">Firebase Log out</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
  import { isAuthenticated } from '../router/index.js';

  const logOut = () => {
    isAuthenticated.value = 'false';
  }
</script>