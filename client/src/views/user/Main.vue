<template>
  <div class="min-h-screen bg-gray-100">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from "@/components/user/Footer.vue";
import Header from "@/components/user/Header.vue";
import MainContent from "@/layouts/user/HomePage.vue";
</script>
<style scoped></style>
