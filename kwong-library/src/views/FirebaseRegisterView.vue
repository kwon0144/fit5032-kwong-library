<template>
    <h1>Create an Account</h1>
    <p><select id="userType" v-model="userType">
        <option value="admin">Admin</option>
        <option value="user">User</option>
    </select></p>
    <p><input type="text" placeholder="Username" v-model="username"/></p>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><button @click="register">Save to Firebase</button></p>
</template> 

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase.js'
import { useRouter } from "vue-router"

const userType = ref("")
const username = ref("")
const email = ref("")
const password = ref("")

const router = useRouter()
const auth = getAuth()

const register = () => {
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
};
</script>
