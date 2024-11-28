<template>
  <!-- <Navbar/> -->
  <section class="py-16 bg-[#f1f1f1]">
    <div class="container mx-auto px-6">
      <!-- <h1 class="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1> -->
      <div class="max-w-2xl mx-auto bg-white rounded-lg p-8">
        <form @submit.prevent="handleUpdateInfor">
          <div class="mb-6">
            <div class="flex items-center">
              <img
                :src="
                  inputUser.avatar ||
                  'https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a'
                "
                alt="Profile Picture"
                class="w-20 h-20 rounded-full border mr-4"
              />
              <input
                :disabled="!isEditing"
                v-model="inputUser.avatar"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button @click="handleUploadImg"></button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="firstname"
                class="block text-gray-700 text-sm font-bold mb-2"
                >First Name</label
              >
              <input
                :disabled="!isEditing"
                v-model="inputUser.firstname"
                type="text"
                id="firstname"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label
                for="lastname"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Last Name</label
              >
              <input
                :disabled="!isEditing"
                v-model="inputUser.lastname"
                type="text"
                id="lastname"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div class="mt-6">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Email</label
            >
            <input
              :disabled="!isEditing"
              type="email"
              id="email"
              v-model="inputUser.email"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div class="mt-6">
            <label
              for="address"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Address</label
            >
            <textarea
              id="address"
              :disabled="!isEditing"
              v-model="inputUser.address"
              rows="3"
              class="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <div class="mt-6">
            <label
              for="phone"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Phone Number</label
            >
            <div class="mt-6">
              <label
                for="phone"
                class="block text-gray-700 text-sm font-bold mb-2"
                >Phone Number</label
              >
              <div>
                <span
                  v-show="!isPhoneFocused"
                  class="block w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-pointer"
                  @click="isPhoneFocused = true"
                >
                  {{ maskPhone(inputUser.phone) }}
                </span>
                <input
                  :disabled="!isEditing"
                  v-show="isPhoneFocused"
                  type="tel"
                  id="phone"
                  v-model="inputUser.phone"
                  @focus="isPhoneFocused = true"
                  @blur="handlePhoneBlur"
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>
          <div class="flex gap-2 justify-end mt-6">
            <button
              v-if="!isEditing"
              @click="isEditing = true"
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >Edit Profile
            </button>
            <button
              v-else
              @click="isEditing = false"
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              >Cancel
            </button>
            <button
              v-if="isEditing"
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import Navbar from "@/layouts/user/Profile.vue";
import Swal from "sweetalert2";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const img = ref("");

const store = useStore();
const router = useRouter();
const token = computed(() => localStorage.getItem("token"));
const user = computed(() => store.getters.getUser);
const inputUser = reactive({
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  phone: "",
  avatar: "",
});

const isEditing = ref(false);

const isPhoneFocused = ref(false);

const maskPhone = (phone) => {
  if (!phone) return "";
  return phone.slice(0, -4).replace(/\d/g, "*") + phone.slice(-4);
};

const handlePhoneBlur = () => {
  isPhoneFocused.value = false;
};

const currentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^0\d{10}$/;
  return phoneRegex.test(phone);
};

const handleUpdateInfor = async () => {
  if (
    !inputUser.firstname ||
    !inputUser.lastname ||
    !inputUser.email ||
    !inputUser.address ||
    !inputUser.phone ||
    !inputUser.avatar
  ) {
    Swal.fire({
      title: "Incomplete Information",
      text: "Please fill in all required fields.",
      icon: "error",
      confirmButtonText: "Okay",
    });
    return;
  }
  if(!inputUser.avatar.endsWith(".png" || ".jpg" || ".jpeg")){
    return Swal.fire({
      title: "Invalid File Format",
      text: "Please choose a valid image file (png, jpg, jpeg).",
      icon: "error",
      confirmButtonText: "Okay",
    });
  }
  // console.log(inputUser);
  const data = {
    firstname: inputUser.firstname,
    lastname: inputUser.lastname,
    email: inputUser.email,
    address: inputUser.address,
    phone: inputUser.phone.startsWith("0")
      ? "+84" + inputUser.phone.split("0").slice(0).join("")
      : inputUser.phone,
    avatar: inputUser.avatar,
  };
  Swal.fire({
    title: "Updating Profile",
    text: "Please wait while we update your profile.",
    icon: "info",
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      store.dispatch("updateUser", { ...user.value, ...data });
      isEditing.value = false;
      isPhoneFocused.value = false;
    }
  });
};

watch(
  () => user.value,
  (newValue) => {
    if (newValue) {
      inputUser.firstname = newValue.firstname;
      inputUser.lastname = newValue.lastname;
      inputUser.email = newValue.email;
      inputUser.address = newValue.address;
      inputUser.phone = newValue.phone.startsWith("+84")
        ? "0" + newValue.phone.split("+84")[1]
        : newValue.phone;
      inputUser.avatar = newValue.avatar;
    }
  }
);

onMounted(async () => {
  if (!token.value) {
    Swal.fire({
      title: "Unauthorized Access",
      text: "You must be logged in to access this page.",
      icon: "error",
      confirmButtonText: "Login",
    }).then((res) => {
      if (res.isConfirmed) router.push("/login");
    });
  } else {
    await store.dispatch("fetchUser", token.value);
  }
});
</script>
<style scoped></style>
