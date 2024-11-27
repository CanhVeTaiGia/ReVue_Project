<template>
   <section class="bg-blue-600 text-white py-20">
      <div class="container mx-auto px-6">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Favorite Book</h1>
        <p class="text-xl mb-8">Explore our vast collection of bestsellers, classics, and hidden gems.</p>
        <button @click="toProducts" class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toProducts = () => {
  router.push('/products');
}
</script>
<style scoped>
</style>