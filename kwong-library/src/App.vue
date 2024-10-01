<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
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



