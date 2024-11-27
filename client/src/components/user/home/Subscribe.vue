<template>
  <section class="bg-blue-600 text-white py-16">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p class="mb-8"
        >Stay updated with our latest releases and exclusive offers.</p
      >
      <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex">
        <input
          type="email"
          placeholder="Enter your email"
          class="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-900"
        />
        <button
          type="submit"
          class="bg-white text-blue-600 px-6 py-2 rounded-r-full font-semibold hover:bg-gray-100 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>
<script setup></script>
<style scoped></style>
