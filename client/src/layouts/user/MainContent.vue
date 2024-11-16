<template>
  <teleport v-if="isShowForm" to="body">
    <AddPostForm :hideAddForm="hideAddForm" :hideImageForm="hideImageForm" :inputValue="inputValue"/>
  </teleport>

  <div class="w-[50%]">
    <div class="w-full bg-[#333] p-4 rounded-[10px] my-4">
      <div class="flex w-full gap-2 border-b-[1px] pb-2 border-[#777]">
        <img
          @click="toProfile"
          src="https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/logo%2Ft%E1%BA%A3i%20xu%E1%BB%91ng%20(3).jpeg?alt=media&token=c9232ab0-db8c-4095-84cd-44a1aaca4937"
          alt=""
          class="size-[40px] rounded-[50%]"
        />
        
        <button
          @click="showAddForm"
          v-if="inputValue"
          class="w-full text-start text-[#bbb] px-4 rounded-[20px] p-2 bg-[#444] hover:bg-[#555]"
          >{{ inputValue }}</button
        >
        <button
          @click="showAddForm"
          v-else
          class="w-full text-start text-[#bbb] px-4 rounded-[20px] p-2 bg-[#444] hover:bg-[#555]"
          >Bạn đang nghĩ gì thế?</button
        >
      </div>
      <button
        class="w-full flex justify-center items-center text-white gap-4 text-[20px] rounded hover:bg-[#444] p-2 px-4 mt-2"
      >
        <font-awesome-icon icon="fa-regular fa-image" />
        <p>Ảnh</p>
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AddPostForm from "../Modal/AddPostForm.vue";

const token = computed(() => JSON.parse(localStorage.getItem("token")) || null);
const isShowForm = ref(false);
const isShowImage = ref(false);
const showAddForm = () => {
  isShowForm.value = true;
};
const inputValue = ref("");
const hideAddForm = () => {
  isShowForm.value = false;
};
const hideImageForm = () => {
  isShowImage.value = false;
};

const showAddImageForm = () => {
  isShowForm.value = true;
  isShowImage.value = true;
};

const router = useRouter();
const toProfile = () => {
  router.push(`/profile/${token.value}`);
};
</script>
<style scoped></style>
