import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenialView from '../views/AccessDenialView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseLogoutView from '../views/FirebaseLogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

import { ref } from 'vue';

export const isAuthenticated = ref('false');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated.value == 'true') next();
            else next(false);
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/access-denial',
        name: 'Access Denial',
        component: AccessDenialView
    },
    {
        path: '/add-book',
        name: 'Add Book',
        component: AddBookView
    },
    {
        path: '/FireLogin',
        name: 'FireLogin',
        component: FirebaseSigninView
    },
    {
        path: '/FireRegister',
        name: 'FireRegister',
        component: FirebaseRegisterView
    },
    {
        path: '/FireLogout',
        name: 'FireLogout',
        component: FirebaseLogoutView
    },
    {
        path: '/GetBookCount',
        name: 'GetBookCount',
        component: GetBookCountView
    },
    {
        path: '/WeatherCheck',
        name: 'WeatherCheck',
        component: WeatherView
    },
    {
        path: '/CountBookAPI',
        name: 'CountBookAPI',
        component: CountBookAPI
    },
    {
        path: '/GetAllBookAPI',
        name: 'GetAllBookAPI',
        component: GetAllBookAPI
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

