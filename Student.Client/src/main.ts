import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "../public/main.scss";

createApp(App).use(router).use(createPinia()).mount("#app");