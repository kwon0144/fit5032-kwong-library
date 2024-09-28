<template>
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <div v-if="error">{{ error }}</div>
    <div v-else>Total number of books: {{ count }}</div>

    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="newBook.isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="newBook.name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
    <div v-if="addBookMessage">{{ addBookMessage }}</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { getFunctions, httpsCallable } from 'firebase/functions';

const count = ref(null);
const error = ref(null);
const newBook = ref({ isbn: '', name: '' });
const addBookMessage = ref('');

const functions = getFunctions();

const getBookCount = async () => {
  try {
    const response = await axios.get('https://countbooks-7quoo4thxa-uc.a.run.app');
    count.value = response.data.count; // Assuming the response contains a 'count' field
  } catch (err) {
    error.value = 'Error fetching book count';
    console.error(err);
  }
};

const addBook = async () => {
  const addBookFunction = httpsCallable(functions, 'addBook');
  
  try {
    const result = await addBookFunction(newBook.value);
    if (result.data.success) {
      addBookMessage.value = `Success: ${result.data.message}`;
    } else {
      addBookMessage.value = `Error: ${result.data.message}`;
    }
  } catch (err) {
    addBookMessage.value = 'Failed to add book';
    console.error(err);
  }
};

</script>

