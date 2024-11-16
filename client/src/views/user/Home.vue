<template>
  <div class="w-full bg-[#222] min-h-screen">
    <Header></Header>
    <div class="w-full flex justify-between h-full">
      <Navbar/>
      <router-view></router-view>
      <SideBar/>
    </div>
  </div>
</template>
<script setup>
import Header from '@/components/layout/Header.vue';
import Navbar from '@/components/layout/Navbar.vue';
import SideBar from '@/components/layout/Sidebar.vue';


</script>
<style scoped>
</style>