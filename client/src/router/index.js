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
  {
    path: "/",
    name: "main",
    redirect: "",
    component: () =>
      import(/* webpackChunkName: "main"*/ "@/views/user/Main.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home"*/ "@/layouts/user/HomePage.vue"),
      },
      {
        path: "category",
        name: "category",
        component: () =>
          import(
            /* webpackChunkName: "category"*/ "@/layouts/user/Category.vue"
          ),
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "profile"*/ "@/layouts/user/Profile.vue"),
        children: [
          {
            path: "",
            name: "edit-profile",
            component: () =>
              import(
                /* webpackChunkName: "edit-profile"*/ "@/components/user/profile/EditProfile.vue"
              ),
          }
        ]
      },
      {
        path: "product-detail/:id",
        name: "product-detail",
        component: () =>
          import(
            /* webpackChunkName: "product"*/ "@/layouts/user/ProductDetail.vue"
          ),
      },
      {
        path: "cart",
        name: "cart",
        component: () =>
          import(/* webpackChunkName: "cart"*/ "@/layouts/user/Cart.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () =>
          import(
            /* webpackChunkName: "products"*/ "@/layouts/user/Products.vue"
          ),
      },
      {
        path: "proceed-order",
        name: "proceed-order",
        component: () =>
          import(
            /* webpackChunkName: "proceed-order"*/ "@/layouts/user/ProceedOrder.vue"
          ),
      },{
        path: "products/:id",
        name: "productId",
        component: () =>
          import(
            /* webpackChunkName: "products"*/ "@/layouts/user/Products.vue"
          ),
      },
      {
        path: "products",
        name: "allProducts",
        component: () =>
          import(
            /* webpackChunkName: "products"*/ "@/layouts/user/Products.vue"
          ),
      },
      {
        path: "about-us",
        name: "about-us",
        component: () =>
          import(/* webpackChunkName: "about-us"*/ "@/layouts/user/AboutUs.vue"),
      }
    ],
  },
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
      {
        path: "product-manager",
        name: "product-manager",
        component: () =>
          import(
            /* webpackChunkName: "product-manager"*/ "@/layouts/admin/ProductManager.vue"
          ),
      },
      {
        path: "order-manager",
        name: "order-manager",
        component: () =>
          import(
            /* webpackChunkName: "order-manager"*/ "@/layouts/admin/OrderManager.vue"
          ),
      },
      
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: () =>
      import(/* webpackChunkName: "admin-login"*/ "@/views/auth/Auth.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found"*/ "@/views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
