<template>
  <header
    class="sticky border-b-[1px] border-[#222] flex w-full gap-[10px] justify-evenly bg-[#333] p-[20px]"
  >
    <img
      src="https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/logo%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(3).jpeg?alt=media&token=c9232ab0-db8c-4095-84cd-44a1aaca4937"
      alt=""
      class="size-[50px] rounded-[50%]"
      srcset=""
    />
    <input
      v-model="search"
      placeholder="Nhập để tìm kiếm"
      class="border-white w-full text-white bg-[#444] border-[none] bg-none p-[10px] rounded-[10px] outline-none"
      type="text"
    />
    <img
      class="size-[50px] rounded-[50%] cursor-pointer"
      src="https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/logo%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(3).jpeg?alt=media&token=c9232ab0-db8c-4095-84cd-44a1aaca4937"
      id="menu-activator"
    />

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </header>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const token = computed(() => JSON.parse(localStorage.getItem("token")));
const toprofile = () => {
  router.push(`/profile/${token.value}`);
};
const logout = () => {
  localStorage.removeItem("token");
};
const search = ref("");
const router = useRouter();
const items = reactive([
  { title: "Trang cá nhân", action: toprofile },
  { title: "Đăng xuất", action: logout },
]);

</script>
<style scoped></style>
