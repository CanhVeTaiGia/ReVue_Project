<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Book of the Day</h2>
      <div
        v-if="bookOfTheDay"
        class="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg overflow-hidden"
      >
        <img
          :src="
            bookOfTheDay.image ||
            'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
          "
          alt=""
          class="w-full md:w-1/3 h-64 object-cover"
        />
        <div class="p-8">
          <h3 class="text-2xl font-bold mb-2">{{ bookOfTheDay.name }}</h3>
          <p v-if="category" class="text-gray-600 mb-4">{{ category }}</p>
          <p class="text-gray-800 mb-4">{{ bookOfTheDay.description }}</p>
          <div class="flex items-center mb-4">
            <span class="text-yellow-400 mr-1"
              ><font-awesome-icon icon="fa-solid fa-star" class="h-5 w-5"
            /></span>
            <span class="font-bold">{{ 0 }} / 5</span>
            <span class="text-gray-600 ml-2"
              >({{ bookOfTheDay.reviews || 0 }}
              {{
                bookOfTheDay.reviews && bookOfTheDay.reviews > 0
                  ? "reviews"
                  : "review"
              }})</span
            >
          </div>
          <button
            @click="viewDetail(bookOfTheDay.id)"
            class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const category = ref("");
const router = useRouter();
const store = useStore();
onMounted(() => {
  store.dispatch("getProducts");
});
const books = computed(() => store.getters.getProducts);

const bookOfTheDay = computed(() => {
  if (books.value) {
    return books.value[Math.floor(Math.random() * books.value.length)];
  }
});
watch(bookOfTheDay, async (newValue) => {
  if (newValue) {
    await store.dispatch("fetchCategory", newValue.categoryId);
    category.value = store.getters.getCategory.name;
  }
});
const viewDetail = (id) => {
  router.push(`/product-detail/${id}`);
};
</script>
<style scoped></style>
