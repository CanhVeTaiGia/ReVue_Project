<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <header class="flex justify-between items-center mb-6"></header>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button
            @click="showAddForm"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            + Add Product
          </button>
          <div class="flex gap-2">
            <input
              v-model="search"
              type="text"
              class="px-4 py-2 border rounded outline-none"
              placeholder="Search product by name"
            />
            <select
              v-model="sort"
              type="text"
              class="border outline-none rounded px-2 py-2"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <select
              class="border outline-none rounded px-2 py-2"
              v-if="categories"
              v-model="filterByCategory"
            >
              <option :value="0">Filter by category</option>
              <option v-for="(item, index) in categories" :value="item.id">{{
                item.name
              }}</option>
            </select>
          </div>
        </div>
        <table
          class="table-auto w-full border-collapse border-gray-100 rounded-lg overflow-hidden shadow-lg"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2">Image</th>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Category mục</th>
              <th class="px-4 py-2">Price</th>
              <th class="px-4 py-2">Stock</th>
              <th class="px-4 py-2">Created at</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <Product
              v-if="products"
              v-for="(item, index) in filteredProducts.slice(
                currentPage,
                currentPage + limit
              )"
              :key="index"
              :item="item"
              :isShowForm="isShowForm"
            />
          </tbody>
        </table>
        <div
          v-if="filteredProducts && products.length > limit"
          class="flex justify-center space-x-2 mt-4"
        >
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50': currentPage === 0,
                'bg-blue-500 text-white': currentPage > 1,
              },
            ]"
          >
            <font-awesome-icon
              icon=" fa-solid fa-angle-left"
              class="px-[9px]"
            ></font-awesome-icon>
          </button>
          <button
            v-for="(page, index) in Math.ceil(filteredProducts.length / 8)"
            :key="page"
            @click="currentPage = index * limit"
            :class="[
              'px-3 py-1 border rounded',
              { 'bg-blue-500 text-white': currentPage === index * limit },
            ]"
          >
            {{ index + 1 }}
            <!-- {{ currentPage  }}
            {{ products.length - limit }} -->
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= filteredProducts.length - limit"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50':
                  currentPage >= filteredProducts.length - limit,
                'bg-blue-500 text-white':
                  currentPage < filteredProducts.length - limit,
              },
            ]"
          >
            <font-awesome-icon
              icon=" fa-solid fa-angle-right"
              class="px-[9px]"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
      <!-- <ProductForm /> -->
    </main>
    <!-- <Form></Form>
    <Delete></Delete> -->
  </div>
</template>

<script setup>
import Product from "@/components/admin/Product.vue";
import { computed, handleError, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const isShowForm = reactive({
  id: null,
  isShow: false,
});
const filterByCategory = ref(0);
const search = ref("");
const sort = ref("asc");
const products = computed(() => store.getters.getProducts);
const categories = computed(() => store.getters.getCategories);
const currentPage = ref(0);
const limit = ref(6);
const filteredProducts = computed(() => {
  if (products.value) {
    return products.value
      .filter((product) =>
        product.name.toLowerCase().includes(search.value.toLowerCase())
      )
      .filter(
        (product) =>
          !filterByCategory.value ||
          product.categoryId === filterByCategory.value
      )
      .sort((a, b) => {
        if (sort.value === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    // console.log();
  }
  return [];
});

const showAddForm = () => {
  isShowForm.id = null;
  isShowForm.isShow = true;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= limit.value;
  }
};

const store = useStore();
onMounted(async () => {
  await store.dispatch("getProducts");
  await store.dispatch("fetchCategories");
});
const nextPage = () => {
  if (currentPage.value < products.value.length - limit.value) {
    currentPage.value += limit.value;
  }
};
</script>

<style scoped></style>
