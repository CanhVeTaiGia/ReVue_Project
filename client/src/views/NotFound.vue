<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 class="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <p class="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</p>
        <p class="text-gray-600 mb-8">Oops! The page you are looking for doesn't exist or has been moved.</p>
        <router-link 
          to="/" 
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  onMounted(() => {
    console.log('404 Page Not Found');
  });
  </script>