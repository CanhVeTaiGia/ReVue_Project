<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center"
        >Book Categories</h1
      >

      <div class="mb-8 max-w-md mx-auto">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search categories..."
          class="w-full px-4 py-2 rounded-lg border outline-none border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div
        v-if="filtered"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="i in filtered"
          :key="i"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <!-- <div
              class="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto"
            >
              <component :is="category.icon" class="w-8 h-8" />
            </div> -->
            <h2 class="text-xl font-semibold text-gray-900 text-center mb-2">{{
              i.name
            }}</h2>
            <p class="text-gray-600 text-center mb-4"
              >{{ i.description.split(" ").slice(0, 10).join(" ") }}...</p
            >
            <button
              @click="toProduct(i.id)"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Explore name
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-gray-600 mt-8">
        No categories found. Try a different search term.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const searchTerm = ref("");
const categories = computed(() => store.getters.getCategories);
const router = useRouter()
const filtered = computed(() => {
  if (searchTerm.value) {
    return categories.value.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  } else {
    return categories.value;
  }
});

const toProduct = (id) => {
  router.push(`/products/${id}`)
}

onMounted(async () => {
  await store.dispatch("fetchCategories");
  // console.log(categories);
});
</script>
