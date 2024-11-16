<template>
  <nav class="w-[15%] flex flex-col p-2 h-[88vh]">
    <div
      v-for="item in items"
      @click="item.action"
      class="p-4 rounded-[5px] text-white flex items-center gap-[15px] cursor-pointer hover:bg-[#111]"
    >
      <font-awesome-icon class="text-white text-[20px]" :icon="item.icon" />
      <p class="text-[20px]">{{ item.title }}</p>
    </div>
  </nav>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toHome = () => {
  router.push("/home");
};
const toMessage = () => {
  router.push("/message");
}
const items = reactive([
  { title: "Trang chủ", action: toHome, icon: "fa-solid fa-home" },
  {
    title: "Tin nhắn",
    action: toMessage,
    icon: "fa-solid fa-comments",
  },
  {
    title: "Bạn bè",
    action: () => {},
    icon: "fa-solid fa-user-friends",
  },
  {
    title: "Nhóm",
    action: () => {},
    icon: "fa-solid fa-users",
  },
  {
    title: "Trang cá nhân",
    action: () => {},
    icon: "fa-solid fa-user-circle",
  }
]);
</script>
<style scoped></style>
