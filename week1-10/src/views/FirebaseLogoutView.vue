<template>
    <button type="submit" class="btn btn-primary me-2"  @click="submitSignOut">Sign Out</button>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth"

const auth = getAuth();

const submitSignOut = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful")
        console.log(auth.currentUser)
    })
}

</script>
