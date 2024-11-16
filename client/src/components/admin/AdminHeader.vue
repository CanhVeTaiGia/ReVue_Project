<template>
  <header
    className="flex justify-between items-center bg-slate-100 w-full h-16 p-8"
  >
    <h1 className="text-2xl font-bold">{{ newRoute }}</h1>
    <div className="flex items-center space-x-6">
      <div v-if="user" className="relative flex items-center justify-end gap-2">
        <img
          :src="
            user.avatar ||
            'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/img%2Favatar-trang-4.jpg?alt=media&token=167e3b00-0833-4792-961d-bd2962ea0fe7'
          "
          className="w-10 h-10 rounded-full"
          alt="Admin Avatar"
        />
        <span className="ml-2 text-gray-700">{{ user.username || "" }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const newRoute = computed(() => {
  return route.name
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
});

const token = computed(() => JSON.parse(localStorage.getItem("token") || null));

onMounted(async () => {
  await store.dispatch("fetchUser", token.value);
});
const user = computed(() => store.getters.getUser);
console.log(user.value);
</script>

<style></style>
