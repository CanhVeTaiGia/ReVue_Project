<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button
            @click="showAddForm()"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            + Add Category
          </button>
          <div class="flex gap-2">
            <input
              v-model="search"
              @input="handleSort"
              type="text"
              class="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name"
            />

            <select
              v-model="filterByStatus"
              @change="handleSortByStatus(filterByStatus)"
              class="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option :value="null">Sort by status</option>
              <option :value="true">Open</option>
              <option :value="false">Block</option>
            </select>

            <select
              @change="handleSort"
              v-model="sort"
              class="border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option hidden value="">Sort by name</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
        <table
          class="table-auto w-full p-1 border-collapse border bg-gray-100 border-gray-200 text-center rounded-lg overflow-hidden"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-center">Name</th>
              <th class="px-4 py-2 text-center">Status</th>
              <th class="px-4 py-2 text-center">Description</th>
              <th class="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="categories"
              v-for="(item, index) in filtercategories.slice(
                currentPage,
                currentPage + limit
              )"
              :key="item.id"
              class="text-center hover:bg-gray-50 cursor-pointer"
            >
              <td class="px-4 py-2 max-w-xs">
                <p class="truncate overflow-hidden whitespace-nowrap">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-4 py-2">
                <button
                  @click="changeCategoryStatus(item)"
                  :class="{
                    'text-green-600 font-bold border border-green-600 px-2 py-1 rounded-xl':
                      item.status,
                    'text-red-600 font-bold border border-red-600 px-2 py-1  rounded-xl':
                      !item.status,
                  }"
                >
                  {{ item.status ? "Mở" : "Đóng" }}
                </button>
              </td>
              <td class="px-4 py-2"
                >{{ item.description.split(" ").slice(0, 16).join(" ") }}
                {{ item.description.length > 16 ? "..." : "" }}</td
              >
              <td class="px-4 py-2">
                <div class="flex items-center justify-center gap-2">
                  <font-awesome-icon
                    @click="showEditForm(item)"
                    class="text-xl text-orange-500"
                    icon="fa-solid fa-pen"
                  ></font-awesome-icon>
                  <font-awesome-icon
                    @click="deleteCategory(item.id)"
                    icon="fa-solid fa-trash"
                    class="text-xl text-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </font-awesome-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="categories && categories.length > limit"
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
            v-for="(page, index) in Math.ceil(filtercategories.length / 8)"
            :key="page"
            @click="currentPage = index * limit"
            :class="[
              'px-3 py-1 border rounded',
              { 'bg-blue-500 text-white': currentPage  === index * limit },
            ]"
          >
            {{ index + 1 }}
            <!-- {{ currentPage }} -->
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= categories.length - limit"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50':
                  currentPage >= categories.length - limit,
                'bg-blue-500 text-white':
                  currentPage < categories.length - limit,
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
    <teleport v-if="isShowForm.value" to="body">
      <CategoryForm :hideForm="hideForm" :category="isShowForm.category">
        <template #header>
          {{ isShowForm.category ? "Edit Category" : "Add Category" }}
        </template>
        <template #submit>
          {{ isShowForm.category ? "Edit" : "Add" }}
        </template>
      </CategoryForm>
    </teleport>
  </div>
</template>
<script setup>
import CategoryForm from "@/components/modal/CategoryForm.vue";
import Swal from "sweetalert2";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const isShowForm = reactive({
  category: null,
  value: false,
});

const showAddForm = () => {
  isShowForm.category = null;
  isShowForm.value = true;
};
const showEditForm = (item) => {
  isShowForm.category = item;
  isShowForm.value = true;
};
const hideForm = () => {
  isShowForm.value = false;
  isShowForm.id = null;
};
const store = useStore();
const currentPage = ref(0);
const limit = ref(8);
const sort = ref("asc");
const search = ref("");
const filterByStatus = ref(null);

const categories = computed(() => store.getters.getCategories);
const filtercategories = computed(() => {
  if (categories.value) {
    return categories.value
      .filter((category) =>
        category.name.toLowerCase().includes(search.value.toLowerCase())
      )
      .filter(
        (category) =>
          filterByStatus.value === null ||
          category.status === filterByStatus.value
      )
      .sort((a, b) => {
        if (sort.value === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }
  return [];
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= limit.value;
  }
};

const changeCategoryStatus = (category) => {
  Swal.fire({
    title: `Bạn có chắc muốn ${
      category.status ? "khóa" : "mở khóa"
    } danh mục này!`,
    icon: "warning",
    confirmButtonText: "OK",
    showCancelButton: true,
    cancelButtonText: "Hủy",
  }).then((res) => {
    if (res.isConfirmed) {
      store.dispatch("updateCategory", {
        ...category,
        status: !category.status,
      });
    }
  });
};

const deleteCategory = (id) => {
  Swal.fire({
    title: "Bạn có chắc muốn xóa danh mục này?",
    icon: "question",
    confirmButtonText: "OK",
    showCancelButton: true,
    cancelButtonText: "Hủy",
  }).then((res) => {
    if (res.isConfirmed) {
      store.dispatch("deleteCategory", id);
    }
  });
};

onMounted(async () => {
  await store.dispatch("fetchCategories");
});

const nextPage = () => {
  if (currentPage.value < categories.value.length - limit.value) {
    currentPage.value += limit.value;
  }
};
</script>
<style scoped></style>
