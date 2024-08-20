
<template>
    <div class="about">
        <h1>Login Page</h1>
    </div>
    <form @submit.prevent="submitForm">
        <div class="col d-flex justify-content-center">
            <div class="col-md-6 col-lg-4 mt-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="loginInput.username">
            </div>
        </div>
        <div class="col d-flex justify-content-center">
            <div class="col-md-6 col-lg-4 mt-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="loginInput.password">
            </div>
        </div>
    </form>
    <div v-if="errormessage" class="text-danger d-flex justify-content-center mt-4">{{ errormessage }}</div>
    <div class="text-center mt-4">
        <button type="submit" class="btn btn-primary me-2" @click=submitLogin>Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearLogin">Clear</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    import { isAuthenticated } from '../router/index.js';

    const loginInput = ref({
        username: '',
        password: ''
    });

    const errormessage = ref(null);

    const submitLogin = () => {
        if (loginInput.value.username !== 'user01'
            && loginInput.value.password !== '123456'){
                errormessage.value = 'Incorrect username or password.'
        }
        else {
            errormessage.value = null;
            isAuthenticated.value = 'true';
            router.push('/about');
        }
    };

    const clearLogin = () => {
        loginInput.value = {
            username: '',
            password: ''
        };
    }
</script>

