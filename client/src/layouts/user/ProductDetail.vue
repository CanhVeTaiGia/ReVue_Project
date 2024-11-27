<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row">
        <!-- Book Cover -->
        <div v-if="product && category" class="md:w-1/3 mb-8 md:mb-0">
          <img
            :src="
              product.image ||
              'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
            "
            class="w-full rounded-lg shadow-lg"
          />
        </div>

        <!-- Book Details -->
        <div v-if="product && category" class="md:w-2/3 md:pl-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{
            product.name
          }}</h1>
          <p class="text-xl text-gray-600 mb-4">{{ category.name }}</p>

          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400 mr-2">
              <span class="h-5 w-5"></span>
            </div>
            <span class="text-gray-600">1000 reviews</span>
          </div>

          <p class="text-gray-700 mb-6"></p>

          <div class="flex items-center mb-6">
            <span class="text-3xl font-bold text-blue-600 mr-4">{{
              product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}</span>
            <!-- <span class="text-lg text-gray-500 line-through"></span> -->
          </div>

          <div class="flex items-center mb-6">
            <button
              @click="addToCart"
              class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mr-4"
            >
              Add to Cart
            </button>
            <!-- <button
              class="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-300 flex items-center"
            >
              <font-awesome-icon
                icon="fa-regular fa-heart"
                class="h-5 w-5 mr-2"
              ></font-awesome-icon>
              Add to Wishlist
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const token = computed(() => localStorage.getItem("token"));
const route = useRoute();
const { id } = route.params;
const product = ref(null);
const category = computed(() => store.getters.getCategory);
const user = computed(() => store.getters.getUser);

const addToCart = async () => {
  console.log(product);

  if (user.value) {
    const cart = {
      id: Math.floor(Math.random() * 10000000000000),
      productId: product.value.id,
      price: product.value.price,
      quantity: 1,
    };
    const existedProduct = user.value.cart.find(
      (item) => item.productId == product.value.id
    );
    if (product.value.stock === 0) {
      Swal.fire({
        title: "Out of stock",
        text: "This product is out of stock",
        icon: "error",
      });
      return;
    }
    if (existedProduct) {
      existedProduct.quantity++;
      store.dispatch("updateUser", {
        ...user.value,
        cart: user.value.cart.map((item) =>
          item.id === product.value.id ? existedProduct : item
        ),
      });
      store.dispatch("updateProduct", {
        ...product.value,
        stock: (product.value.stock -= 1),
      });
      return Swal.fire({
        title: "Success",
        text: "Add to cart successfully",
        icon: "success",
      });
    }
    store.dispatch("updateUser", {
      ...user.value,
      cart: [...user.value.cart, cart],
    });
    store.dispatch("updateProduct", {
      ...product.value,
      stock: (product.value.stock -= 1),
    });
    await getData();
    return Swal.fire({
      title: "Success",
      text: "Add to cart successfully",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Fail to add to cart",
      text: "You must login to add to cart",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        route.push("/login");
      }
    });
  }
};

const getData = async () => {
  await store.dispatch("getProduct", id);
};

onMounted(async () => {
  await getData();
  await store.dispatch("fetchUser", token.value);
  product.value = store.getters.getProduct;
});

watch(
  () => product.value,
  (newValue) => {
    if (newValue?.categoryId) {
      store.dispatch("fetchCategory", newValue.categoryId);
    }
  }
);
</script>
<style scoped></style>
