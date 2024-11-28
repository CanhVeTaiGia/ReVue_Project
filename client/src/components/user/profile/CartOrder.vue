<template>
  <div class="flex justify-between items-center mb-4">
    <div>
      <h3 v-if="product" class="font-semibold">{{ product.name }}</h3>
      <p class="text-gray-600">Quantity: {{ props.item.quantity }}</p>
    </div>
    <span class="font-semibold">
      {{
        (props.item.price * props.item.quantity).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })
      }}</span
    >
  </div>
  <div class="border-t border-gray-200 mt-4 pt-4">
    <div class="flex justify-between items-center">
      <span class="text-xl font-semibold">Total</span>
      <span class="text-2xl font-bold text-blue-600">
        {{ props.totalAmount }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps(["item", "cart", "totalAmount"]);
const store = useStore();
// console.log(props.item);
const product = computed(() => store.getters.getProduct);

onMounted(async () => {
  if (props.item.productId) {
    await store.dispatch("getProduct", props.item.productId);
  }
});
</script>
