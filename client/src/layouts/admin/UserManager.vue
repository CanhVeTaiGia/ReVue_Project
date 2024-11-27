<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <div class="flex gap-2">
            <input
              v-model="searchQuery"
              type="text"
              class="border outline-none border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by email"
            />
            <!-- <button class="bg-blue-500 px-4 py-2 rounded text-white"
              >Create User</button
            > -->
          </div>
          <select v-model="filterUserByStatus" class="border rounded p-2">
            <option :value="null">Filter By Status</option>
            <option class="p-1" :value="true"
              >Đang hoạt dộng
            </option>
            <option :value="false">Ngừng hoạt động</option>
          </select>
        </div>
        <table
          class="table-auto w-full p-1 border-collapse border bg-gray-100 border-gray-200 text-center rounded-lg overflow-hidden"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 w-[60%] py-2 items-center gap-2">
                <div
                  @click="changeSort"
                  class="flex items-center rounded w-[20%] pl-2 cursor-pointer hover:bg-gray-50 gap-2"
                  ><p>Users</p>
                  <font-awesome-icon
                    class="text-sm"
                    :icon="
                      sort === 'asc'
                        ? 'fa-solid fa-arrow-up'
                        : 'fa-solid fa-arrow-down'
                    "
                /></div>
              </th>
              <th class="px-4 py-2">Created at</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="filteredUsers"
              v-for="item in filteredUsers.slice(currentPage, currentPage + limit)"
              :key="item.id"
              class="hover:bg-gray-50 cursor-pointer"
            >
              <td class="px-4 py-2">
                <div class="flex items-center gap-2">
                  <img
                    class="size-10 rounded-full"
                    :src="
                      item.avatar ||
                      'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/img%2Favatar-trang-4.jpg?alt=media&token=167e3b00-0833-4792-961d-bd2962ea0fe7'
                    "
                    alt=""
                  />
                  <div class="flex items-start flex-col">
                    <div class="flex items-center gap-2 font-[600]">
                      <p>{{ item.firstname }} {{ item.lastname }}</p>
                      <font-awesome-icon
                        class="text-green-500"
                        v-if="item.status"
                        icon="fa-regular fa-circle-check"
                      />
                      <font-awesome-icon
                        class="text-red-500"
                        v-else
                        icon="fa-solid fa-circle-minus"
                      />
                    </div>
                    <p class="text-[12px]">{{ item.phone }}</p>
                    <p class="text-[12px]">{{ item.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-2">
                {{ item.created_at.split("-").reverse().join("/") }}
              </td>
              <td>
                <div class="flex justify-center gap-3">
                  <font-awesome-icon
                    @click="showUserDetail(item.id)"
                    class="text-[20px]"
                    icon="fa-regular fa-eye"
                  />
                  <font-awesome-icon
                    @click="cantBan"
                    v-if="item.role"
                    class="text-[20px] text-blue-500"
                    icon="fa-solid fa-shield-halved"
                  />
                  <font-awesome-icon
                    @click="changeUserStatus(item.id)"
                    v-else-if="item.status"
                    class="text-[20px] text-green-500"
                    icon="fa-solid fa-lock-open"
                  />
                  <font-awesome-icon
                    @click="changeUserStatus(item.id)"
                    v-else
                    class="text-[20px] text-red-500"
                    icon="fa-solid fa-lock"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="users && users.length > limit"
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
            v-for="(page, index) in Math.ceil(users.length / 8)"
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
            :disabled="currentPage >= users.length - limit"
            :class="[
              'py-1 border rounded',
              {
                'bg-gray-400 cursor-not-allowed opacity-50':
                  currentPage >= users.length - limit,
                'bg-blue-500 text-white':
                  currentPage < users.length - limit,
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
    <teleport v-if="isShowUserDetail.isShow" to="body">
      <UserDetail
        :id="isShowUserDetail.id"
        :showUserDetail="showUserDetail"
        :hideUserDetail="hideUserDetail"
      />
    </teleport>
  </div>
</template>
<script setup>
import UserDetail from "@/components/modal/UserDetail.vue";
import Swal from "sweetalert2";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const limit = ref(6);
const currentPage = ref(0);
const searchQuery = ref("");
const users = computed(() => store.getters.getUsers);
const sort = ref("asc");
const filterUserByStatus = ref(null);
const filteredUsers = computed(() => {
  if (users.value) {
    return users.value
      .filter((item) => {
        return item.email
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      })
      .filter((item) => {
        return filterUserByStatus.value === null
          ? true
          : item.status === filterUserByStatus.value;
      })
      .sort((a, b) => {
        const nameA = `${a.firstname} ${a.lastname}`;
        const nameB = `${b.firstname} ${b.lastname}`;

        if (sort.value === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
  }
  return [];
});

const isShowUserDetail = reactive({
  id: null,
  isShow: false,
});
const showUserDetail = (id) => {
  isShowUserDetail.id = id;
  isShowUserDetail.isShow = true;
};
const hideUserDetail = () => {
  isShowUserDetail.id = null;
  isShowUserDetail.isShow = false;
};
const cantBan = () => {
  Swal.fire({
    title: "Không thể khóa tài khoản này!",
    icon: "error",
    confirmButtonText: "OK",
  });
};
const changeUserStatus = async (id) => {
  const index = await users.value.findIndex((user) => user.id == id);
  if (index != -1) {
    const user = users.value[index];
    return Swal.fire({
      title: `Bạn có chắc muốn ${
        user.status ? "khóa" : "mở khóa"
      } tài khoản này!`,
      icon: "warning",
      confirmButtonText: "OK",
      showCancelButton: true,
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.isConfirmed) {
        user.status = !user.status;
        store.dispatch("updateUser", user);
      }
    });
  }
};

const changeSort = () => {
  sort.value = sort.value === "asc" ? "desc" : "asc";
};


const store = useStore();
onMounted(async () => {
  await store.dispatch("getUsers");
});
const nextPage = () => {
  if (currentPage.value < users.value.length - limit.value) {
    currentPage.value += limit.value;
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= limit.value;
  }
};
</script>
<style scoped></style>
