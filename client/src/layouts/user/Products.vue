<template>
  <section class="py-16">
    <div class="container mx-auto px-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Products</h1>
      <div class="flex mb-4 gap-3">
        <input
          placeholder="Nhập để tìm kiếm"
          v-model="search"
          type="text"
          class="border rounded-3xl outline-none w-full px-4 py-2"
        />
        <select
          @change="log"
          v-model="filterByPrice"
          class="border rounded-3xl outline-none py-2 px-4"
        >
          <option value="">Filter by price</option>
          <option :value="{ min: 10000, max: 20000 }">10000đ - 20000đ</option>
          <option :value="{ min: 20000, max: 80000 }">20000đ - 80000đ</option>
          <option :value="{ min: 80000, max: 160000 }">80000đ - 160000đ</option>
        </select>
      </div>

      <!-- Filters -->
      <div class="mb-8 flex flex-wrap gap-4">
        <router-link
          to="/products"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium',
            !id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          ]"
          >All</router-link
        >
        <router-link
          v-if="categories"
          v-for="category in categories"
          :key="category"
          :to="`/products/${category.id}`"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium',
            id === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          ]"
        >
          {{ category.name }}
        </router-link>
      </div>

      <!-- Bestsellers Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-if="filteredBooks"
          v-for="book in filteredBooks.slice(currentPage, currentPage + limit)"
          :key="book.id"
          class="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden"
        >
          <img
            @click="() => router.push(`/product-detail/${book.id}`)"
            :src="
              book.image ||
              'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
            "
            :alt="book.title"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <h2
              @click="() => router.push(`/product-detail/${book.id}`)"
              class="text-xl font-semibold text-gray-800 mb-2"
              >{{ book.name }}</h2
            >
            <p class="mb-2">{{ book.author }}</p>
            <div
              @click="() => router.push(`/product-detail/${book.id}`)"
              class="flex items-center mb-2"
            >
              <span class="text-gray-600 ml-2"
                >({{ book.reviews }})
                {{ book.reviews > 0 ? "reviews" : "review" }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span
                @click="() => router.push(`/product-detail/${book.id}`)"
                class="text-blue-600 font-bold"
                >{{
                  book.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })
                }}</span
              >
              <button
                @click.prevent="handleAddToCart(book)"
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
          v-if="filteredBooks.length > limit"
          v-for="(item, index) in Math.ceil(filteredBooks.length / limit)"
          @click="currentPage = index * limit"
          :class="[
            'mx-1 px-3 py-1 rounded',
            index * limit === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
          ]"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

library.add(
  faSearch,
  faShoppingCart,
  faUser,
  faStar,
  faFacebook,
  faTwitter,
  faInstagram
);

const search = ref("");
const currentPage = ref(0);
const limit = ref(8);
const route = useRoute();
const store = useStore();
const categories = computed(() => store.getters.getCategories);
const products = computed(() => store.getters.getProducts);
const id = ref(null);
const token = computed(() => localStorage.getItem("token"));
const user = computed(() => store.getters.getUser);
const router = useRouter();
const filterByPrice = ref("");

const log = () => {
  console.log(filterByPrice.value);
};

const filteredBooks = computed(() => {
  if (products.value) {
    let filtered = products.value;

    if (id.value) {
      filtered = filtered.filter((book) => book.categoryId === id.value);
    }

    if (search.value.trim() !== "") {
      const searchTerm = search.value.toLowerCase();
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filterByPrice.value) {
      filtered = filtered.filter(
        (book) =>
          book.price >= filterByPrice.value.min &&
          book.price <= filterByPrice.value.max
      );
    }

    return filtered;
  }
  return [];
});

onMounted(async () => {
  await store.dispatch("fetchCategories");
  await store.dispatch("getProducts");
  if (token.value) {
    await store.dispatch("fetchUser", token.value);
  }
});
onMounted(() => {
  if (route.params.id) {
    id.value = parseInt(route.params.id);
    console.log(id.value);
  }
});
watch(
  () => route.params.id,
  (newValue) => {
    id.value = parseInt(newValue);
    console.log(id.value);
  }
);

const handleAddToCart = async (product) => {
  if (user.value) {
    const cart = {
      id: Math.floor(Math.random() * 10000000000000),
      productId: product.id,
      price: product.price,
      quantity: 1,
    };
    const existedProduct = user.value.cart.find(
      (item) => item.productId == props.item.id
    );
    // console.log(11, existedProduct, props.item.id);

    if (product.stock === 0) {
      return Swal.fire({
        title: "Out of stock",
        text: "This product is out of stock",
        icon: "error",
      }).then((res) => {
        if (res.isConfirmed) {
          router.push("/login");
        }
      });
    }
    if (existedProduct) {
      existedProduct.quantity++;
      store.dispatch("updateUser", {
        ...user.value,
        cart: user.value.cart.map((item) =>
          item.productId === product.id ? existedProduct : item
        ),
      });
      store.dispatch("updateProduct", {
        ...product,
        stock: (product.stock -= 1),
      });
      return Swal.fire({
        title: "Success",
        text: "Add to cart successfully",
        icon: "success",
      });
    }
    store.dispatch("updateUser", {
      ...user.value,
      cart: [...user.value.cart, cart],
    });
    store.dispatch("updateProduct", {
      ...product,
      stock: (product.stock -= 1),
    });
    return Swal.fire({
      title: "Success",
      text: "Add to cart successfully",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Fail to add to cart",
      text: "You must login to add to cart",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
      }
    });
  }
};
</script>
<style scoped></style>
