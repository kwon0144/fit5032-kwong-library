<template>
    <div class="about">
      <h1>Log In Required</h1>
    </div>
    <div class = "d-flex justify-content-center">
      <button type="button" class="btn btn-primary me-2" @click="goLogInPage">Go Log In</button>
    </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

    const router = useRouter();

    const goLogInPage = () => {
    router.push('/login');
    }

</script>