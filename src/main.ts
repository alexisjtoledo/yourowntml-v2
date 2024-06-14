import { createApp } from "vue";
import { createPinia } from "pinia";

// Component imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Helpers imports
import "@/assets/main.css";
import "@/helpers/mobile";
import "@/helpers/icons";

import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
