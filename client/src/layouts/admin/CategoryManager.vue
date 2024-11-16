<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button
            @click="showForm('', 'add')"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            + Add Category
          </button>
          <div class="flex gap-2">
            <!-- tìm kiếm theo tên -->
            <input
              v-model="NameSearch"
              type="text"
              class="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Lọc theo tên"
            />

            <!-- Lọc theo trạng thái -->
            <select
              class="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              v-model="filterStatus"
            >
              <option value="">Lọc theo trạng thái</option>
              <option value="true">Mở</option>
              <option value="false">Đóng</option>
            </select>

            <!-- Sắp xếp theo tên -->
            <select
              class="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              v-model="sortOrder"
            >
              <option value="">Sắp xếp theo tên</option>
              <option value="az">Sắp xếp từ A đến Z</option>
              <option value="za">Sắp xếp từ Z đến A</option>
            </select>
          </div>
        </div>
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border text-center">STT</th>
              <th class="px-4 py-2 border text-center">Name</th>
              <th class="px-4 py-2 border text-center">Trạng thái</th>
              <th class="px-4 py-2 border text-center">Mô tả</th>
              <th class="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in categoryPage"
              :key="item.id"
              class="text-center"
            >
              <td class="px-4 py-2 border">
                {{ (currentPage - 1) * itemPage + index + 1 }}
              </td>
              <td class="px-4 py-2 border truncate max-w-xs">
                <p class="truncate overflow-hidden whitespace-nowrap">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-4 py-2 border">
                <span
                  :class="{
                    'text-green-600 font-bold': item.status,
                    'text-red-600 font-bold': !item.status,
                  }"
                >
                  {{ item.status ? "Mở" : "Đóng" }}
                </span>
              </td>
              <td class="px-4 py-2 border">{{ item.description }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center gap-2">
                  <button class="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button class="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Phân trang -->
        <div class="flex justify-center space-x-2 mt-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50': currentPage === 1,
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
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 border rounded',
              { 'bg-blue-500 text-white': currentPage === page },
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50':
                  currentPage === totalPages,
                'bg-blue-500 text-white': currentPage < totalPages,
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
    </main>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
onMounted(() => {
  // store.dispatch('fetchCategorys')
})
</script>
<style scoped></style>
