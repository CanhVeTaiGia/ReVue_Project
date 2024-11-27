<template>
   <section class="bg-gray-200 py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="review in customerReviews" :key="review.id" class="bg-white rounded-lg p-6 shadow-md">
            <div class="flex items-center mb-4">
              <img :src="review.avatar" :alt="review.name" class="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 class="font-semibold">{{ review.name }}</h3>
                <div class="flex text-yellow-400">
                  <StarIcon v-for="i in 5" :key="i" class="h-4 w-4" :class="{ 'text-gray-300': i > review.rating }" />
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </section>
</template>
<script setup>
</script>
<style scoped>
</style>