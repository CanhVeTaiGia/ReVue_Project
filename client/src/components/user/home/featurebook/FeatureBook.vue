<template>
  <div class="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden">
    <img
    @click="() => router.push(`/product-detail/${props.item.id}`)"
      :src="
        props.item.image ||
        'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
      "
      alt=""
      class="w-full h-64 object-cover"
    />
    <div class="p-4">
      <h3 @click="() => router.push(`/product-detail/${props.item.id}`)" class="font-semibold text-lg mb-2">{{ props.item.name }}</h3>
      <p @click="() => router.push(`/product-detail/${props.item.id}`)" v-if="category" class="text-gray-600 mb-2">{{ category.name }}</p>
      <div class="flex justify-between items-center">
        <span @click="() => router.push(`/product-detail/${props.item.id}`)" class="font-bold text-blue-600">{{
          props.item.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })
        }}</span>
        <button
          @click="handleAddToCart"
          class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps(["item"]);
const token = computed(() => localStorage.getItem("token"));
const store = useStore();
const category = computed(() => store.getters.getCategory);
const user = computed(() => store.getters.getUser);
const router = useRouter();

const handleAddToCart = async () => {
  if (user.value) {
    const cart = {
      id: Math.floor(Math.random() * 10000000000000),
      productId: props.item.id,
      price: props.item.price,
      quantity: 1,
    };
    const existedProduct = user.value.cart.find(
      (item) => item.productId == props.item.id
    );
    // console.log(11, existedProduct, props.item.id);

    const res = await axios.get(
      `http://localhost:8080/products/${props.item.id}`
    );
    const product = res.data;
    if (product.stock === 0) {
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
          item.productId === props.item.id ? existedProduct : item
        ),
      });
      store.dispatch("updateProduct", {
        ...product,
        stock: (product.stock -= 1),
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
      ...product,
      stock: (product.stock -= 1),
    });
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

watch(
  () => props.item.categoryId,
  (newValue) => {
    store.dispatch("fetchCategory", newValue);
  }
);
</script>
<style scoped></style>
