<template>
    <div class="about">
      <h1>Access Denied</h1>
      <p>Please log in to access the About Page</p>
      <button type="button" class="btn btn-primary" @click="navigateLogIn">Log In</button>
    </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const navigateLogIn = () => {
    router.push('/login')
  }
</script>