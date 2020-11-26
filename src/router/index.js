import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const files = require.context('../components', true, /\.vue$/)
const pages = {};
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default;
})
console.log(pages)
// 生成路由规则
const generator = [];
Object.keys(pages).forEach(item => {
  generator.push({
    path: `/${pages[item].name.replace(/-/g, '/')}`,
    name: pages[item].name,
    component: pages[item]
  })
});
// console.log(routelist)
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  ...generator
];

const router = new VueRouter({
  routes
});

export default router;
