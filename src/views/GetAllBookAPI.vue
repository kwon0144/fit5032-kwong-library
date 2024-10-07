<template>
    <h1>Get All Book API</h1>
    <pre> {{ jsondata }} </pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jsondata = ref(null);
const error = ref(null);

  const getAllBookAPI = async () => {
      try {
        const response = await axios.get('https://showallbooks-7quoo4thxa-uc.a.run.app');
        jsondata.value = response.data;
      } catch (err) {
        error.value = 'Error fetching all book data';
        console.error(err);
      }
  };

  onMounted(() => {
    getAllBookAPI()
  });

</script>

