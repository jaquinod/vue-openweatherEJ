import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Details from "@/views/Details";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/city/:cityName", name: "City", component: Details }
  ]
});

export default router;
