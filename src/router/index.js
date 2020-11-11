import Vue from "vue";
import VueRouter from "vue-router";
import Form from "../views/form.vue";
import Slide from "../views/slide.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Formulário",
    component: Form
  },
  {
    path: "/news",
    name: "Slide",
    component: Slide
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
