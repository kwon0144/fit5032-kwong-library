<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
    <div>
        <h1>Update Book</h1>
        <form @submit.prevent="updateBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="update_isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="update_name" id="name" required />
            </div>
            <button type="submit">Update Book</button>
        </form>
    </div>
    <div>
        <h1>Delete Book</h1>
        <form @submit.prevent="deleteBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="delete_isbn" id="isbn" required />
            </div>
            <button type="submit">Delete Book</button>
        </form>
    </div>
    <BookList/>
</template>

<script setup>
    import { ref } from 'vue';
    import { db } from '../firebase/init.js'
    import { collection, addDoc, query, where, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
    import BookList from '../components/BookList.vue';

    const isbn = ref('');
    const name = ref('');
    
    const update_isbn = ref('');
    const update_name = ref('');

    const delete_isbn = ref('');

    const addBook = async () => {
        try {
            const isbnNumber = Number(isbn.value);
            if (isNaN(isbnNumber)) {
                alert('ISBN must be valid number');
                return
            }
            await addDoc(collection(db, 'books'), {
                isbn: isbnNumber,
                name: name.value
            });
            isbn.value = '';
            name.value = '';
            alert('Book added successfully!');
        } catch (error) {
            console.error('Error adding book: ', error);
        } 
    };

    const updateBook = async() => {
        try {
            const isbnNumber = Number(update_isbn.value);
            if(isNaN(isbnNumber)) {
                alert('ISBN must be valid number');
                return
            }
            const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                alert('No book found with the provided ISBN');
                return;
            }
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                name: update_name.value,
                });
            });
            update_isbn.value = '';
            update_name.value = '';
            alert('Book updated successfully!');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }

    const deleteBook = async() => {
        try {
            const isbnNumber = Number(delete_isbn.value);
            if(isNaN(isbnNumber)) {
                alert('ISBN must be valid number');
                return
            }
            const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                alert('No book found with the provided ISBN');
                return;
            }
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref)
            });
            delete_isbn.value = '';
            alert('Book deleted successfully!');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    }

</script>
