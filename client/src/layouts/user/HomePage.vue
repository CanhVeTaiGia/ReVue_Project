<template>
  <!-- Hero  -->
  <Carousel></Carousel>
  <Hero />
  <BookOfTheDay/>
  <FeatureBook/>
  <CategoriesBook/>
  <Subscribe/>
</template>
<script setup>
import BookOfTheDay from "@/components/user/home/BookOfTheDay.vue";
import Carousel from "@/components/user/home/Carousel.vue";
import CategoriesBook from "@/components/user/home/CategoriesBook.vue";
import FeatureBook from "@/components/user/home/featurebook/FeatureBooks.vue";
import Hero from "@/components/user/home/Hero.vue";
import Subscribe from "@/components/user/home/Subscribe.vue";
</script>
<style scoped></style>
