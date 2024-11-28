<template>
  <header class="bg-white shadow z-50 sticky top-0 left-0">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <router-link
          to="/"
          class="text-2xl font-bold text-blue-600 mb-4 md:mb-0"
          >BookHaven</router-link
        >
        <div class="w-full md:w-1/3 mb-4 md:mb-0">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for books..."
              class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              class="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              <font-awesome-icon
                class="size-5"
                icon="fa-solid fa-magnifying-glass"
              />
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/cart"
            class="text-gray-600 relative hover:text-gray-900"
            ><font-awesome-icon
              class="size-6 text-black"
              icon="fa-solid fa-cart-shopping"
            />
            <div
              v-if="user"
              class="size-6 flex justify-center items-center absolute text-[12px] rounded-full top-[-10px] text-white right-[-15px] bg-red-500"
            >
              {{ user.cart.length }}
            </div>
          </router-link>
          <button v-if="token" id="menu-activator">
            <font-awesome-icon
              class="text-gray-600 relative cursor-pointer"
              icon="fa-solid fa-user"
            ></font-awesome-icon>
          </button>
          <button
            class="bg-red-500 rounded text-white px-4 py-2"
            @click="toLogin"
            v-else
            >Đăng nhập</button
          >
          <v-menu activator="#menu-activator">
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
              >
                <v-list-item-title @click="item.actions">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="hidden md:flex justify-center space-x-6 mt-4">
        <router-link to="/" class="text-gray-600 hover:text-blue-600"
          >Home</router-link
        >
        <router-link to="/category" class="text-gray-600 hover:text-blue-600"
          >Categories</router-link
        >
        <!-- <router-link to="/new-release" class="text-gray-600 hover:text-blue-600"
          >New Releases</router-link
        > -->
        <router-link to="/products" class="text-gray-600 hover:text-blue-600"
          >Products</router-link
        >
        <router-link to="/about-us" class="text-gray-600 hover:text-blue-600"
          >About Us</router-link
        >
      </div>
    </nav>
  </header>
</template>
<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const token = computed(() => localStorage.getItem("token"));
const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.getUser);
const logout = () => {
  Swal.fire({
    title: "Success",
    text: "Logout successfully",
    icon: "success",
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  });
};
const toProfile = () => {
  router.push("/profile");
};
const items = ref([
  {
    title: "Profile",
    actions: toProfile,
  },
  {
    title: "Logout",
    actions: logout,
  },
]);

const toLogin = () => {
  router.push("/login");
};

onMounted(() => {
  if (token.value) {
    store.dispatch("fetchUser", token.value);
  }
});
watch(() => user.value, () => {
  if(!user.value.status){
    Swal.fire({
      title: "Your account has been banned",
      text: "Please contact with admin to continue",
      icon: "error",
      confirmButtonText: "Okay",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    })
  }
})
</script>
<style scoped></style>
