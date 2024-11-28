<template>
  <tr class="text-center cursor-pointer hover:bg-gray-50">
    <td class="px-4 py-2">
      <div class="flex justify-center">
        <img
          :src="
            props.item.image ||
            'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
          "
          alt=""
          class="w-12 h-12 border rounded-lg object-cover"
        />
      </div>
    </td>
    <td class="px-4 py-2 max-w-xs">{{ props.item.name || "Chưa cập nhật" }}</td>
    <td v-if="category" class="px-4 py-2">{{
      category.name || "Chưa cập nhật"
    }}</td>
    <td v-else>Chưa cập nhật</td>
    <td class="px-4 py-2">
      {{
        item.price.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }) || "Chưa cập nhật"
      }}
    </td>
    <td class="px-4 py-2">{{ props.item.stock || "Chưa cập nhật" }}</td>
    <td v-if="props.item.createdAt" class="px-4 py-2">{{
      props.item.createdAt.split("-").reverse().join("/") || "Chưa cập nhật"
    }}</td>

    <td class="px-4 py-2">
      <div class="flex justify-center items-center gap-3">
        <font-awesome-icon
          @click="showEditForm(props.item.id)"
          icon="fa-solid fa-pen"
          class="text-xl text-orange-500"
        ></font-awesome-icon>
        <font-awesome-icon
          @click="handleDelete(props.item.id)"
          icon="fa-solid fa-trash"
          class="text-xl text-red-500"
        ></font-awesome-icon>
      </div>
    </td>
  </tr>

  <teleport v-if="props.isShowForm.isShow" to="body">
    <ProductForm
      :id="props.isShowForm.id"
      :hideForm="hideForm"
      :product="props.item"
    >
      <template #header>
        {{ props.isShowForm.id ? "Sửa" : "Thêm" }}
      </template>
      <template #submit>
        {{ props.isShowForm.id ? "Sửa" : "Thêm" }}
      </template>
    </ProductForm>
  </teleport>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import ProductForm from "../modal/ProductForm.vue";
import Swal from "sweetalert2";

const props = defineProps(["item", "isShowForm"]);
const emit = defineEmits(["showForm"]);
const store = useStore();
const handleDelete = (id) => {
  Swal.fire({
    title: "Bạn có muốn xóa sản phẩm này?",
    showCancelButton: true,
    confirmButtonText: "Ok",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      store.dispatch("deleteProduct", id);
    }
  });
};

const category = ref(null);

const showEditForm = (id) => {
  props.isShowForm.id = id;
  props.isShowForm.isShow = true;
};

const hideForm = () => {
  props.isShowForm.id = null;
  props.isShowForm.isShow = false;
};

// console.log(props.item);
onMounted(async () => {
  await store.dispatch("fetchCategory", props.item.categoryId);
  category.value = store.getters.getCategory;
});

watch(
  () => props.item.categoryId,
  async (newValue) => {
    if (props.item.categoryId) {
      await store.dispatch("fetchCategory", newValue);
      category.value = store.getters.getCategory;
    }
  }
);
</script>
<style scoped></style>
