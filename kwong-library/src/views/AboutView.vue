<template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
  </div>
  <div class = "d-flex justify-content-center">
    <button type="button" class="btn btn-primary me-2" @click="logOut">Log Out</button>
  </div>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const logOut = () => {
    localStorage.setItem('isAuthenticated', 'false');
    router.push('/login');
  }
</script>
