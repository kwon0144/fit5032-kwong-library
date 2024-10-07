import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import './assets/main.css'
//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import './firebase/init.js'; // Initilise firebase and firestore

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(router)
app.mount('#app')

