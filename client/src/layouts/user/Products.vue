<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Products</h1>

      <!-- Filters -->
      <div class="mb-8 flex flex-wrap gap-4">
        <button
          v-for="category in categories"
          :key="category"
          @click="setActiveCategory(category)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium',
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Bestsellers Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="book.cover"
            :alt="book.title"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{
              book.title
            }}</h2>
            <p class="text-gray-600 mb-2">{{ book.author }}</p>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <font-awesome-icon
                  v-for="i in 5"
                  :key="i"
                  :icon="['fas', 'star']"
                  :class="{ 'text-gray-300': i > book.rating }"
                />
              </div>
              <span class="text-gray-600 ml-2">({{ book.reviews }})</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold"
                >${{ book.price.toFixed(2) }}</span
              >
              <button
                class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex justify-center">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="setCurrentPage(page)"
          :class="[
            'mx-1 px-3 py-1 rounded',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faShoppingCart, faUser, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faShoppingCart, faUser, faStar, faFacebook, faTwitter, faInstagram)

const categories = ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Romance']
const activeCategory = ref('All')
const currentPage = ref(1)
const booksPerPage = 8

const books = ref([
  { id: 1, title: "The Midnight Library", author: "Matt Haig", price: 14.99, rating: 4.5, reviews: 2584, cover: "/placeholder.svg?height=400&width=300", category: "Fiction" },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 12.99, rating: 4.8, reviews: 3256, cover: "/placeholder.svg?height=400&width=300", category: "Non-Fiction" },
  { id: 3, title: "The Silent Patient", author: "Alex Michaelides", price: 11.99, rating: 4.3, reviews: 1987, cover: "/placeholder.svg?height=400&width=300", category: "Mystery" },
  { id: 4, title: "Project Hail Mary", author: "Andy Weir", price: 15.99, rating: 4.7, reviews: 2145, cover: "/placeholder.svg?height=400&width=300", category: "Sci-Fi" },
  { id: 5, title: "The Vanishing Half", author: "Brit Bennett", price: 13.99, rating: 4.4, reviews: 1876, cover: "/placeholder.svg?height=400&width=300", category: "Fiction" },
  { id: 6, title: "Educated", author: "Tara Westover", price: 12.99, rating: 4.6, reviews: 2789, cover: "/placeholder.svg?height=400&width=300", category: "Non-Fiction" },
  { id: 7, title: "The Guest List", author: "Lucy Foley", price: 10.99, rating: 4.2, reviews: 1654, cover: "/placeholder.svg?height=400&width=300", category: "Mystery" },
  { id: 8, title: "Dune", author: "Frank Herbert", price: 11.99, rating: 4.7, reviews: 3567, cover: "/placeholder.svg?height=400&width=300", category: "Sci-Fi" },
  { id: 9, title: "Where the Crawdads Sing", author: "Delia Owens", price: 14.99, rating: 4.5, reviews: 2987, cover: "/placeholder.svg?height=400&width=300", category: "Fiction" },
  { id: 10, title: "Becoming", author: "Michelle Obama", price: 16.99, rating: 4.8, reviews: 4231, cover: "/placeholder.svg?height=400&width=300", category: "Non-Fiction" },
  { id: 11, title: "The Thursday Murder Club", author: "Richard Osman", price: 12.99, rating: 4.3, reviews: 1876, cover: "/placeholder.svg?height=400&width=300", category: "Mystery" },
  { id: 12, title: "The Martian", author: "Andy Weir", price: 11.99, rating: 4.6, reviews: 3124, cover: "/placeholder.svg?height=400&width=300", category: "Sci-Fi" },
])

const filteredBooks = computed(() => {
  return books.value.filter(book => 
    activeCategory.value === 'All' || book.category === activeCategory.value
  ).slice((currentPage.value - 1) * booksPerPage, currentPage.value * booksPerPage)
})

const totalPages = computed(() => {
  const filteredCount = books.value.filter(book => 
    activeCategory.value === 'All' || book.category === activeCategory.value
  ).length
  return Math.ceil(filteredCount / booksPerPage)
})

const setActiveCategory = (category) => {
  activeCategory.value = category
  currentPage.value = 1
}

const setCurrentPage = (page) => {
  currentPage.value = page
}
</script>
<style scoped></style>
