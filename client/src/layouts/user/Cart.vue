<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <!-- Cart Items -->
      <div
        v-if="user && user.cart && user.cart.length > 0"
        class="flex flex-col lg:flex-row gap-8"
      >
        <!--  -->
        <EachCart
          v-for="(item, index) in user.cart"
          :item="item"
          :key="index"
        />

        <!-- Order Summary -->
        <div v-if="user && user.cart && user.cart.length > 0" class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4"
              >Order Summary</h2
            >

            <div class="border-t border-gray-200 mt-4 pt-4">
              <div class="flex justify-between items-center">
                <span class="text-xl font-semibold">Total</span>
                <span class="text-2xl font-bold text-blue-600">{{
                  totalCart.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })
                }}</span>
              </div>
            </div>
            <button
              @click="toProceed"
              class="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <svg
          class="h-24 w-24 text-gray-400 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h18l-2 12H5L3 3z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 16a4 4 0 01-8 0"
          />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4"
          >Your cart is empty</h2
        >
        <p class="text-gray-600 mb-8"
          >Looks like you haven't added any books to your cart yet.</p
        >
        <router-link
          to="/"
          class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>
  </section>
</template>
<script setup>
import EachCart from "@/components/user/cart/EachCart.vue";
import Swal from "sweetalert2";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const token = computed(() => localStorage.getItem("token"));
const user = computed(() => store.getters.getUser);
const totalCart = computed(() => {
  if (user.value && user.value.cart) {
    let total = 0;
    user.value.cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
});

onMounted(() => {
  if (!token.value) {
    Swal.fire({
      title: "Please Login",
      text: "You need to login to proceed with checkout",
      icon: "warning",
    }).then((res) => {
      if (res.isConfirmed) {
        router.push("/login");
      }
    });
  } else {
    store.dispatch("fetchUser", token.value);
  }
});
const toProceed = () => {
  router.push("/proceed-order");
};
</script>
<style scoped></style>
