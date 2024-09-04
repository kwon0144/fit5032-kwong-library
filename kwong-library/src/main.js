import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import './assets/main.css'
//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)

app.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNllwAlDUkSZ7yjkIrB-4bkGJdNz5xLZk",
  authDomain: "week7-kinsey.firebaseapp.com",
  projectId: "week7-kinsey",
  storageBucket: "week7-kinsey.appspot.com",
  messagingSenderId: "632243177230",
  appId: "1:632243177230:web:3827abb1429b7ed387f95f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
