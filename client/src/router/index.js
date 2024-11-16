import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import(/*webChunkName: "login"*/ "@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/*webChunkName: "register"*/ "@/views/auth/Register.vue"),
  },
  // {
  //   path: "",
  //   name: "home",
  //   redirect: "",
  //   component: () =>
  //     import(/* webpackChunkName: "home"*/ "@/views/user/Home.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "main",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "main"*/ "@/components/layout/MainContent.vue"
  //         ),
  //     },
  //   ],
  // },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/dashboard",
    component: () =>
      import(/* webpackChunkName: "admin"*/ "@/views/admin/Admin.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard"*/ "@/layouts/admin/Dashboard.vue"
          ),
      },
      {
        path: "user-manager",
        name: "user-manager",
        component: () =>
          import(
            /* webpackChunkName: "user-manager"*/ "@/layouts/admin/UserManager.vue"
          ),
      },
      {
        path: "category-manager",
        name: "category-manager",
        component: () =>
          import(
            /* webpackChunkName: "category-manager"*/ "@/layouts/admin/CategoryManager.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
