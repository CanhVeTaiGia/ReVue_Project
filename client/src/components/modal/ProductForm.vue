<template>
  <div
    class="w-full justify-center items-center bg-[#000000bb] flex fixed top-0 left-0 h-screen"
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
        <div class="flex justify-center row-span-3 items-center">
          <div class="size-[80px] relative">
            <img
              class="size-full rounded border"
              :src="
                input.image ||
                'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
              "
              alt=""
            />
            <label
              for="image"
              class="p-2 cursor-pointer border flex justify-center items-center right-[-15px] bottom-[-15px] bg-white rounded-full absolute"
            >
            <input id="image" hidden type="file" @change="handleImageUpload" />
              <font-awesome-icon icon="fa-solid fa-camera"></font-awesome-icon>
            </label>
          </div>
        </div>
        <input
          v-model="input.name"
          placeholder="Product name"
          class="border outline-none px-4 rounded py-2"
          type="text"
        />
        <input
          v-model="input.price"
          placeholder="Product price"
          :min="1000"
          class="border outline-none px-4 rounded py-2"
          type="number"
        />
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
        <input
          v-model="input.stock"
          placeholder="Product stock"
          :min="0"
          class="border outline-none px-4 rounded py-2"
          type="number"
        />
        <textarea
        v-model="input.description"
          class="grid row-span-2 col-span-2 border rounded resize-none p-2 outline-none"
        ></textarea>
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
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "@/firebase/config";

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
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
const input = reactive({
  name: props.id ? props.product?.name : "",
  categoryId: props.id ? props.product?.categoryId : 1,
  price: props.id ? props.product?.price : 0,
  stock: props.id ? props.product?.stock : 0,
  description: props.product?.description || "",
  image: props.id ? props.product?.image : "",
  createAt: props.id ? props.product?.createAt : getToday(),
  updateAt: props.id ? props.product?.updateAt : getToday(),
});
const handleAdd = () => {
  const newInput = {
    ...input
  };
  store.dispatch("addProduct", newInput);
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
    createAt: input.createAt,
    updateAt: getToday(),
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

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const snapshot = storageRef(storage, 'productImg/' + file.name);
  try {
    await uploadBytes(snapshot, file);
    const downloadURL = await getDownloadURL(snapshot);
    input.image = downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};
</script>
<style scoped></style>
