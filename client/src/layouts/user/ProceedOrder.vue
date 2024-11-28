<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Complete Your Order</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Order Summary -->
        <div class="lg:w-1/2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4"
              >Order Summary</h2
            >
            <div v-if="user && user.cart">
              <CartOrder
                v-for="(item, index) in user.cart"
                :item="item"
                :cart="user.cart"
                :totalAmount="totalAmount"
                :key="index"
              />
            </div>
          </div>
        </div>
        <!-- Shipping and Payment Form -->
        <div class="lg:w-1/2">
          <form
            @submit.prevent="submitOrder"
            class="bg-white rounded-lg shadow-md p-6"
          >
            <h2 class="text-2xl font-semibold text-gray-800 mb-4"
              >Shipping Information</h2
            >
            <div class="mb-4">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Full Name</label
              >
              <input
                type="text"
                id="name"
                v-model="shippingInfo.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="address"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Address</label
              >
              <input
                type="text"
                id="address"
                v-model="shippingInfo.address"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="city"
                class="block text-gray-700 text-sm font-bold mb-2"
                >City</label
              >
              <input
                type="text"
                id="city"
                v-model="shippingInfo.city"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <h2 class="text-2xl font-semibold text-gray-800 mb-4"
              >Payment Information</h2
            >
            <div class="mb-4">
              <label
                for="cardNumber"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Card Number</label
              >
              <input
                type="text"
                id="cardNumber"
                v-model="paymentInfo.cardNumber"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import CartOrder from "@/components/user/profile/CartOrder.vue";

const token = computed(() => localStorage.getItem("token"));
const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.getUser);

const totalAmount = computed(() => {
  if (user.value && user.value.cart) {
    return user.value.cart
      .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
      .toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });
  }
});

const shippingInfo = reactive({
  name: "",
  address: "",
  city: "",
});

const paymentInfo = reactive({
  cardNumber: "",
});
const getToday = () => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const submitOrder = () => {
  if (
    !shippingInfo.name ||
    !shippingInfo.address ||
    !shippingInfo.city ||
    !paymentInfo.cardNumber
  ) {
    Swal.fire({
      title: "Warning",
      text: "Please fill in the shipping information.",
      icon: "warning",
    });
    return;
  }
  const orderDetailId = [];
  Array.from({ length: user.value.cart.length }, (_, index) => {
    const newOrderDetail = {
      id: Math.floor(Math.random() * 1000000000000),
      productId: user.value.cart[index].productId,
      quantity: user.value.cart[index].quantity,
      price: user.value.cart[index].price,
    };
    store.dispatch("addOrderDetail", { ...newOrderDetail });
    orderDetailId.push(newOrderDetail.id);
  });
  store.dispatch("updateUser", { ...user.value, cart: [] });
  const newOrder = {
    userId: user.value.id,
    order_at: getToday(),
    total_price: totalAmount.value,
    status: 1,
    name: shippingInfo.name,
    address: shippingInfo.address,
    city: shippingInfo.city,
    card_number: paymentInfo.cardNumber,
    order_details: orderDetailId,
  };
  store.dispatch("createOrder", newOrder);
  Swal.fire({
    title: "Success",
    text: "Order placed successfully!",
    icon: "success",
    confirmButtonText: "Continue Shopping",
  }).then(res => {
    if (res.isConfirmed) {
      router.push("/");
    }
  })
};

onMounted(async () => {
  if (!token.value) {
    Swal.fire({
      title: "Please Login",
      text: "You need to be logged in to place an order.",
      icon: "error",
      confirmButtonText: "Login",
    }).then((res) => {
      if (res.isConfirmed) {
        router.push("/login");
      }
    });
  } else {
    await store.dispatch("fetchUser", token.value);
  }
});
</script>
