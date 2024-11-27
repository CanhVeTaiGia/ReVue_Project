<template>
  <div>
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
        <button @click="props.hideForm" className="text-blue-500 mb-4"
          >Back</button
        >
        <h2 className="text-2xl font-bold mb-4">
          <slot name="header"></slot>
        </h2>
        <form @submit.prevent="handleSubmit" className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="name" className="block  text-sm font-medium"
              >Name</label
            >
            <input
              v-model="inputCategory.name"
              type="text"
              id="name"
              name="name"
              className="mt-1 outline-none p-2 border rounded w-full"
              required
            />
            <div v-if="exitedCategory" className="text-red-500 text-xs mt-1">
              The category is already exited
            </div>
          </div>
          <div className="col-span-1">
            <label htmlFor="status" className="block text-sm font-medium"
              >Status</label
            >
            <select
              v-model="inputCategory.status"
              id="status"
              name="status"
              className="mt-1 cursor-pointer  outline-none p-2 border rounded w-full"
            >
              <option :value="true">Open</option>
              <option :value="false">Block</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium"
              >Description</label
            >
            <textarea
              v-model="inputCategory.description"
              className="mt-1 p-2 border resize-none rounded outline-none w-full"
              rows="{3}"
              placeholder="Category description"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded mt-4"
            >
              <slot name="submit"></slot>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps(["hideForm", "category"]);
console.log(props.category);

const store = useStore();
const exitedCategory = ref(false);
const inputCategory = reactive({
  name: (props.category && props.category.name) || "",
  status: (props.category && props.category.status) || true,
  description: (props.category && props.category.description) || "",
});
console.log(inputCategory);

const handleSubmit = () => {
  if (props.category) {
    handleEdit();
  } else {
    handleAdd();
  }
};
const handleAdd = async () => {
  const res = await axios.get(
    `http://localhost:8080/category?name=${inputCategory.name}`
  );
  if (res.data.length > 0) {
    exitedCategory.value = true;
    return;
  }
  exitedCategory.value = false;
  await store.dispatch("createCategory", { ...inputCategory });
  store.dispatch('fetchCategories')
  props.hideForm();
};
const handleEdit = () => {
  const updatedCategory = {
    ...props.category,
    name: inputCategory.name,
    status: inputCategory.status,
    description: inputCategory.description,
  };
  store.dispatch("updateCategory", { ...updatedCategory });
  props.hideForm();
};
</script>

<style></style>
