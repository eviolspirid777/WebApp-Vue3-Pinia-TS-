import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia"
import '../public/FontAwesome/scss/fontawesome.scss'

createApp(App).use(router).use(createPinia()).mount('#app')