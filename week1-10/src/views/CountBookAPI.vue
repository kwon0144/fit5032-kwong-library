<template>
    <h1>Book Counter API</h1>
    <button @click="getBookCountAPI">Get Book Count</button>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <p>Total number of books: {{ count }}</p>
      <pre> {{ jsondata }} </pre>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const count = ref(null);
const jsondata = ref(null);
const error = ref(null);

  const getBookCountAPI = async () => {
      try {
        const response = await axios.get('https://countbooks-7quoo4thxa-uc.a.run.app');
        count.value = response.data.count;
        jsondata.value = response.data;
      } catch (err) {
        error.value = 'Error fetching book count';
        console.error(err);
      }
  };

  onMounted(() => {
    getBookCountAPI();
  });

</script>

