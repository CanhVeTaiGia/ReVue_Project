<template>
  <div class="relative w-full overflow-hidden bg-gray-100">
    <div
      v-if="products"
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <router-link
      v-for="(product, index) in products"
      :key="product.id"
      :to="`/product-detail/${product.id}`"
        class="w-full flex-shrink-0 relative"
      >
        <img
          :src="
            product.image ||
            'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
          "
          :alt="product.name"
          class="w-full h-[600px] object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div class="p-8 text-white w-full">
            <h3 class="font-semibold text-3xl mb-2">{{ product.name }}</h3>
            <p class="text-lg mb-4">{{ product.description }}</p>
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400"> </div>
              <span class="ml-2 text-lg">({{ product.reviews }} reviews)</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-bold text-3xl"
                >${{ product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'}) }}</span
              >
              <span class="text-lg">Stock: {{ product.stock }}</span>
            </div>
            <p class="text-sm mt-2">Category ID: {{ product.categoryId }}</p>
            <p class="text-sm">Created: {{ formatDate(product.createdAt) }}</p>
            <p class="text-sm">Updated: {{ formatDate(product.updatedAt) }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition duration-300"
      aria-label="Previous product"
    >
      <ChevronLeftIcon class="h-8 w-8 text-black" />
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition duration-300"
      aria-label="Next product"
    >
      <ChevronRightIcon class="h-8 w-8 text-black" />
    </button>

    <!-- Slide Indicators -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(_, index) in products"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all duration-300',
          currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-vue-next";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters.getProducts);

const currentSlide = ref(0);
let intervalId = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % products.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + products.value.length) % products.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  intervalId = setInterval(nextSlide, 5000);
};

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(async () => {
  store.dispatch("getProducts");
});

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>
