<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>

    <main class="main-box">
        <!--JSON />-->
        <!--Form /-->
        <router-view></router-view>
    </main>
  </div>
</template>

<style>
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px; /* Adjust this value to control how far from the top the content appears */
  }
</style>
