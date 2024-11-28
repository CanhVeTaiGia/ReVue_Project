<template>
  <div
    class="w-full justify-center items-center bg-[#0000002b] flex fixed top-0 left-0 h-screen"
  >
    <form @submit.prevent="handleSubmit" class="w-1/2 p-4 bg-white rounded">
      <div class="flex justify-between">
        <h2 class="text-2xl font-[600]"
          ><slot name="header"></slot> sản phẩm</h2
        >
        <h2 @click="props.hideForm" class="text-2xl cursor-pointer font-[600]"
          >X</h2
        >
      </div>
      <div class="grid grid-cols-3 gap-4 my-4">
        <div class="flex justify-center row-span-4 items-center">
          <div class="relative">
            <img
              class="size-full rounded border"
              :src="
                input.image ||
                'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
              "
              alt=""
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-[600]" for="">Image URL</label>
          <input
            class="border outline-none px-4 rounded py-2"
            v-model="input.image"
            placeholder="Image URL"
            type="text"
          />
          <!-- <button ></button> -->
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="font-[600]"> Name </label>
          <input
            v-model="input.name"
            placeholder="Product name"
            class="border outline-none px-4 rounded py-2"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="font-[600]">Price</label>
          <input
            v-model="input.price"
            placeholder="Product price"
            :min="1000"
            class="border outline-none px-4 rounded py-2"
            type="number"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="" class="font-[600]">Category</label>
          <select
            v-model="input.categoryId"
            class="border px-4 py-2 outline-none rounded"
            v-if="categories"
          >
            <option
              v-for="(item, index) in categories.filter((item) => item.status)"
              :key="index"
              :value="item.id"
              >{{ item.name }}</option
            >
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-[600]" for="">Stock</label>
          <input
            v-model="input.stock"
            placeholder="Product stock"
            :min="0"
            class="border outline-none px-4 rounded py-2"
            type="number"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-[600]" for="">Author</label>
          <input
            v-model="input.author"
            placeholder="Tác giả"
            class="border outline-none px-4 rounded py-2"
            type="text"
          />
        </div>
        <div class="gap-2 grid row-span-2 col-span-2 ">
          <label for="">Mô tả</label>
          <textarea
          v-model="input.description"
          class="border rounded resize-none p-2 outline-none"
        ></textarea>
        </div>
        
      </div>
      <div class="grid col-span-3">
        <button class="px-4 py-2 rounded text-white bg-blue-500"
          ><slot name="submit"></slot> Sản phẩm</button
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";

const props = defineProps(["id", "hideForm", "product"]);
const img = reactive({
  src: "",
  url: null,
});
const store = useStore();
onMounted(() => {
  store.dispatch("fetchCategories");
});
const categories = computed(() => store.getters.getCategories);

const getToday = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
const input = reactive({
  name: props.id ? props.product?.name : "",
  categoryId: props.id ? props.product?.categoryId : 1,
  price: props.id ? props.product?.price : 0,
  stock: props.id ? props.product?.stock : 0,
  description: props.id ? props.product?.description : "",
  image: props.id ? props.product?.image : "",
  createdAt: props.id ? props.product?.createdAt : getToday(),
  updatedAt: props.id ? props.product?.updateAt : getToday(),
  author: props.id ? props.product?.author : "",
});
const handleAdd = async () => {
  if (
    !input.name ||
    !input.categoryId ||
    !input.price ||
    !input.stock ||
    !input.description ||
    !input.image ||
    !input.author
  ) {
    return Swal.fire({
      title: "Thông báo",
      text: "Bạn cần nhập đầy đủ thông tin!",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(res => {
      if (res.isConfirmed) {
        return
      }
    })
  }
  const res = await axios.get(`http://localhost:8080/products?name_like=${input.name}`);
  if (res.data.length > 0) {
    return Swal.fire({
      title: "Thông báo",
      text: "Sản phẩm đã tồn tại!",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(res => {
      if (res.isConfirmed) {
        return
      }
    })
  }
  const newInput = {
    ...input,
  };
  console.log(newInput);

  store.dispatch("createProduct", newInput);
  props.hideForm();
};
const handleEdit = () => {
  console.log(props.id);

  const updatedInput = {
    id: props.id,
    name: input.name,
    categoryId: input.categoryId,
    price: input.price,
    stock: input.stock,
    description: input.description,
    image: input.image,
    createdAt: input.createAt,
    updatedAt: getToday(),
    author: input.author,
  };
  store.dispatch("updateProduct", updatedInput);
  props.hideForm();
};
const handleSubmit = () => {
  if (props.id) {
    handleEdit();
  } else {
    handleAdd();
  }
};
</script>
<style scoped></style>
