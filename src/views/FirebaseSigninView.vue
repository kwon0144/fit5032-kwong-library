<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password"/></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'
import { useRouter } from "vue-router";

const email = ref ("")
const password = ref ("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log("Sign In Successful!")
        console.log(auth.currentUser)
        const docRef = doc(db, 'users', data.user.uid);
        return getDoc(docRef);
    })
    .then((docSnap) => {
        if (docSnap.exists()) {
            const role = docSnap.data().role;
            if (role === "admin") {
                console.log("Admin Log In")
                router.push("/")
            } else {
                console.log("User Log In")
                router.push("/")
            }
        } else {
            console.log("No such document")
        }
    })
    .catch((error) => {
        console.log(error.code)
    });
}
</script>

