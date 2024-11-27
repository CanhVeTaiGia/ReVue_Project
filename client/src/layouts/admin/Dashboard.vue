<template>
  <div>
    <div class="flex">
      <main class="flex-1 p-5 bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <div class="grid grid-cols-3 gap-6">
            <!-- Số sản phẩm đã bán -->
            <div
              class="p-6 bg-white border border-gray-700 text-black rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div class="flex items-center">
                <div class="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14M5 12l5-5m0 10l-5-5m14 0l-5-5m0 10l5-5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold">Số sản phẩm đã bán</h3>
                  <p class="mt-2 text-3xl font-extrabold">--</p>
                </div>
              </div>
            </div>
            <!-- Doanh thu -->
            <div
              class="p-6 bg-white border border-gray-700 text-black rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div class="flex items-center">
                <div class="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold">Doanh thu</h3>
                  <p class="mt-2 text-3xl font-extrabold">--</p>
                </div>
              </div>
            </div>
            <!-- Sản phẩm trong kho -->
            <div
              class="p-6 bg-white border border-gray-700 text-black rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div class="flex items-center">
                <div class="mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 7h18m-2-4v4M6 17l2-2m4 4l2-2m4 4l2-2m-6-6l2-2m4 4l2-2M3 7l9 9m9-9l-9 9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold">Sản phẩm trong kho</h3>
                  <p class="mt-2 text-3xl font-extrabold">--</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

onMounted(() => {
  // store.dispatch()
})
const order = ref(0);
// const 

</script>
<style scoped>
</style>