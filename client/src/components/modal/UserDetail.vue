<template>
  <div
    class="w-full h-screen flex absolute top-0 left-0 justify-center items-center bg-[#00000072]"
  >
    <form class="w-[900px] p-10 bg-white rounded-md">
      <div class="flex items-center justify-between pb-4">
        <h2 class="text-2xl font-[700]">User Detail</h2>
        <p
          @click="props.hideUserDetail"
          class="text-2xl cursor-pointer font-[700]"
          >X</p
        >
      </div>
      <div class="flex gap-10">
        <div class="flex w-[200px] gap-2 items-center flex-col">
          <img
            class="size-12 rounded-full"
            :src="
              user.avatar ||
              'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/img%2Favatar-trang-4.jpg?alt=media&token=167e3b00-0833-4792-961d-bd2962ea0fe7'
            "
            alt=""
          />
          <div class="text-xl font-[500] mt-2">
            {{ user.email || "" }}
          </div>
          <div
            @click="changeUserStatus"
            class="hover:bg-gray-50 cursor-pointer py-2 px-4 rounded flex items-center gap-1"
          >
            <p>{{
              user.role ? "Can't Ban" : user.status ? "Ban User" : "Unban User"
            }}</p>
            <font-awesome-icon
              v-if="user.role"
              class="text-blue-500"
              icon="fa-solid fa-shield-halved"
            />
            <font-awesome-icon
              v-else-if="user.status"
              class="text-green-500"
              icon="fa-solid fa-lock-open"
            />
            <font-awesome-icon
              v-else
              class="text-red-500"
              icon="fa-solid fa-lock"
            />
          </div>
        </div>

        <div class="flex w-full gap-5 flex-col">
          <div class="flex w-full pr-5 gap-10 justify-between">
            <div class="flex flex-col w-full gap-2">
              <label class="block text-xl font-[500]" for="">First name</label>
              <input
                class="border px-4 py-2 w-full bg-white rounded"
                :value="user.firstname || ''"
                type="text"
                disabled
              />
            </div>
            <div class="flex flex-col w-full gap-2">
              <label class="block text-xl font-[500]" for="">Last name</label>
              <input
                class="border px-4 py-2 w-full bg-white rounded"
                :value="user.lastname || ''"
                type="text"
                disabled
              />
            </div>
          </div>
          <div class="flex w-full pr-5 gap-10 justify-between">
            <div class="flex flex-col w-full gap-2">
              <label class="block text-xl font-[500]" for="">Email</label>
              <input
                class="border px-4 py-2 w-full bg-white rounded"
                :value="user.email || ''"
                type="text"
                disabled
              />
            </div>
            <div class="flex flex-col w-full gap-2">
              <label class="block text-xl font-[500]" for="">Phone</label>
              <input
                class="border px-4 py-2 w-full bg-white rounded"
                :value="user.phone || ''"
                type="text"
                disabled
              />
            </div>
          </div>

          <div class="flex flex-col w-full gap-2">
            <label class="block text-xl font-[500]" for="">Address</label>
            <input
              class="border px-4 py-2 w-full bg-white rounded"
              :value="user.address || ''"
              type="text"
              disabled
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["showUserDetail", "hideUserDetail", "id"]);
// console.log(props.id);
const changeUserStatus = () => {
  if (user.value.role) {
    Swal.fire({
      title: "Bạn không thể khóa tài khoản này!",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }
  const updatedUser = {
    ...user.value,
    status: !user.value.status,
  };
  Swal.fire({
    title: `Bạn có chắc muốn ${
      user.value.status ? "khóa" : "mở khóa"
    } tài khoản này!`,
    icon: "warning",
    confirmButtonText: "OK",
    showCancelButton: true,
    cancelButtonText: "Hủy",
  }).then((res) => {
    if (res.isConfirmed) {
      store.dispatch("updateUser", updatedUser);
    }
  });
};

watch(() => props.id, async (newId) => {
  if (newId) {
    await store.dispatch("fetchUser", newId);
  }
});

onMounted(async () => {
  if (props.id) {
    await store.dispatch("fetchUser", props.id);
  }
});
const user = computed(() => store.getters.getUser);
</script>
<style scoped></style>
