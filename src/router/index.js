import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/city/:cityName", name: "City", component: About }
  ]
});

export default router;
