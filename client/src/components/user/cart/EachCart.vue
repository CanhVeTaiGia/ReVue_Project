<template>
  <div v-if="props.item && product" class="lg:w-2/3">
    <div
      class="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <img
        v-if="product"
        :src="
          product.image ||
          'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
        "
        alt="Book cover"
        class="w-32 h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
      />
      <div class="flex-grow">
        <h2 v-if="product" class="text-xl font-semibold text-gray-800 mb-2">{{
          product.name
        }}</h2>
        <!-- <p v-if="category" class="text-gray-600 mb-2">{{ category.name }}</p> -->
        <p class="text-blue-600 font-bold mb-4">{{
          (props.item.quantity * props.item.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })
        }}</p>
        <div class="flex items-center">
          <button
            @click="handleDecrease"
            class="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-md"
          >
            <font-awesome-icon
              icon="fa-solid fa-angle-left"
            ></font-awesome-icon>
          </button>
          <input
            type="number"
            readonly
            :value="props.item.quantity"
            min="1"
            :max="product.stock"
            class="w-16 outline-none text-center border-t border-b border-gray-200 py-1"
          />
          <button
            @click="handleIncrease"
            class="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md"
          >
            <font-awesome-icon
              icon="fa-solid fa-angle-right"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
      <button class="mt-4 md:mt-0 text-red-600 hover:text-red-800">
        <font-awesome-icon icon="fa-solid fa-trash" class="size-6" />
      </button>
    </div>
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const props = defineProps(["item"]);
const product = ref(null);

watch(
  () => props.item.productId,
  (newValue) => {
    if (newValue) {
      store.dispatch("getProduct", newValue);
      product.value = store.getters.getProduct;
    }
  }
);
onMounted(async () => {
  if (!product.value) {
    await store.dispatch("getProduct", props.item.productId);
    product.value = store.getters.getProduct;
  }
});
const handleIncrease = () => {
  if (props.item.quantity < product.value.stock) {
    props.item.quantity++;
  } else {
    Swal.fire({
      title: "Sản phẩm đã hết hàng",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
const handleDecrease = () => {
  if (props.item.quantity > 1) {
    props.item.quantity--;
  } else {
    Swal.fire({
      title: "Vui lòng chọn ít nhất một sản phẩm",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
</script>
<style scoped></style>
