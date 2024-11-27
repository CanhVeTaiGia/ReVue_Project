<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Featured Books</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <!--  -->
        <FeatureBook
          v-if="featureProduct"
          v-for="item in featureProduct.slice(0, 4)"
          :item="item"
        />
        <!--  -->
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import FeatureBook from "./FeatureBook.vue";

const store = useStore();
const products = computed(() => store.getters.getProducts);
const featureProduct = computed(() => {
  if (products && products.value) {
    return products.value.sort((a, b) => {
      return b.stock - a.stock;
    });
  }
});
console.log();


onMounted(() => {
  store.dispatch("fetchProducts");
});
</script>
<style scoped></style>
