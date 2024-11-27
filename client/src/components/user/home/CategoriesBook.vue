<template>
  <section class="bg-gray-200 py-16">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Browse Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
        v-if="categories"
          v-for="category in categories.slice(0, 4)"
          class="bg-white rounded-lg cursor-pointer shadow-md p-6 text-center hover:shadow-lg transition duration-300"
        >
          <!-- <component
            :is="category.icon"
            class="h-12 w-12 mx-auto mb-4 text-blue-600"
          /> -->
          <h3 class="font-semibold">{{ category.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const categories = computed(() => store.getters.getCategories);
onMounted(() => {
  store.dispatch("fetchCategories");
});
</script>
<style scoped></style>
