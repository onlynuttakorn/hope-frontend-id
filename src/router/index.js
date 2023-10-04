import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import HomePage from "@/views/HomePage";
import Student from "@/views/Student";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/students",
      name: "Student",
      component: Student
    }
  ]
});
