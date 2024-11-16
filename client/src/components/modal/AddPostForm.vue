<template>
  <div
    class="w-full justify-center top-0 flex left-0 items-center absolute h-screen bg-[#0000003b]"
  >
    <form class="w-[30%] p-4" @submit.prevent="handleAddPost">
      <textarea class="" name="" id=""></textarea>
    </form>
  </div>
</template>
<script setup>
const props = defineProps(["hideAddForm", "hide"]);
const handleAddPost = () => {};
</script>
<style scoped></style>
