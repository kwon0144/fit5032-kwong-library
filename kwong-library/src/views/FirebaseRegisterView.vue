<template>
    <h1>Create an Account</h1>
    <p><select id="userType" v-model="userType">
        <option value="admin">Admin</option>
        <option value="user">User</option>
    </select></p>
    <p><input type="text" placeholder="Username" v-model="username"/></p>
    <p><input type="text" placeholder="Email"
        @blur="() => validateEmail(true)"
        @input="() => validateEmail(false)" 
        v-model="email"/></p>
    <div v-if="error" class="text-danger">{{ error }}</div> 
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><button @click="register">Save to Firebase</button></p>
</template> 

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'
import { useRouter } from "vue-router"

const userType = ref("")
const username = ref("")
const email = ref("")
const password = ref("")
const error = ref(null)

const router = useRouter()
const auth = getAuth()

const register = () => {
    validateEmail(true);
    if (error.value == null){
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Register Successful!")
            const docRef = doc(db, 'users', data.user.uid);
            setDoc(docRef, {
                role: userType.value,
                username: username.value
            })
            console.log("User info sucessfully written into database")
            router.push("FireLogin")
        }).catch((error) => {
            console.log(error.code);
        })
    }
}

const validateEmail = (blur) => {
    const isCorrectFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
    if (email.value.length < 1 || !isCorrectFormat) {
        if (blur) error.value = '* please input a valid email'
    } else if (userType.value == "admin") {
        const isAdminFormat = /^[a-zA-Z0-9._%+-]+@book\.com$/.test(email.value);
        if (!isAdminFormat) {
            if (blur) error.value = '* please input a valid admin email';
        } else {
            error.value = null;
        }
    } else {
        error.value = null;
    }
}

</script>