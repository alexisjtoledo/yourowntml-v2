import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SelectWeekendView from "@/views/SelectWeekendView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/weekend",
      name: "weekend",
      component: SelectWeekendView,
    },
  ],
});

export default router;
