<template>
  <div class="flex w-full">
    <AdminNavbar />
    <div class="w-full">
      <AdminHeader />
      <router-view />
    </div>
  </div>
</template>
<script setup>
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
</script>
<style scoped></style>
