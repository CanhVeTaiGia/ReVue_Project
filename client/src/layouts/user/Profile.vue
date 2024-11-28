<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Vertical Navbar -->
    <nav class="w-64 bg-white shadow-lg min-h-screen flex flex-col">
      <!-- User Profile Section -->
      <div class="p-4 border-b">
        <div class="flex items-center space-x-3 mb-4">
          <img
            :src="user?.avatar || defaultAvatar"
            alt="Profile"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-gray-800">
              {{ user ? `${user.firstname} ${user.lastname}` : "User Name" }}
            </p>
            <p class="text-sm text-gray-500">{{
              user?.email || "email@example.com"
            }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="flex-1 py-4">
        <router-link
          to="/profile"
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-blue-50 text-blue-600': currentRoute === '/profile' }"
        >
          <font-awesome-icon icon="user" />
          <span>Profile</span>
        </router-link>

        <router-link
          to="/history"
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
          :class="{ 'bg-blue-50 text-blue-600': currentRoute === '/history' }"
        >
          <font-awesome-icon icon="box" />
          <span>History</span>
        </router-link>

        <button
          @click="isPasswordModalOpen = true"
          class="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
        >
          <font-awesome-icon icon="key" />
          <span>Change Password</span>
        </button>

        <button
          @click="handleLogout"
          class="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-gray-100"
        >
          <font-awesome-icon icon="sign-out-alt" />
          <span>Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="flex-1">
      <router-view></router-view>
    </div>

    <!-- Password Change Modal -->
    <div
      v-if="isPasswordModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-2xl font-bold mb-6">Change Password</h2>
        <form @submit.prevent="handlePasswordChange">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Current Password
            </label>
            <div class="relative">
              <input
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="passwordForm.currentPassword"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <font-awesome-icon
                  :icon="showCurrentPassword ? 'eye-slash' : 'eye'"
                  class="text-gray-400"
                />
              </button>
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="passwordForm.newPassword"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <font-awesome-icon
                  :icon="showNewPassword ? 'eye-slash' : 'eye'"
                  class="text-gray-400"
                />
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="passwordForm.confirmPassword"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <font-awesome-icon
                  :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
                  class="text-gray-400"
                />
              </button>
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="isPasswordModalOpen = false"
              class="px-4 py-2 text-gray-600 border-t shadow-md rounded hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingBag,
  faUser,
  faKey,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faTachometerAlt,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import bcrypt from "bcryptjs";

library.add(
  faShoppingBag,
  faUser,
  faKey,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faTachometerAlt,
  faBox
);

const store = useStore();
const router = useRouter();
const route = useRoute();
const token = computed(() => localStorage.getItem("token"));

const defaultAvatar =
  "https://firebasestorage.googleapis.com/v0/b/data-cvtg.appspot.com/o/productImg%2Fimages.png?alt=media&token=5b60ae32-8a5c-4578-bf19-a797279d041a";
const user = computed(() => store.getters.getUser);
const currentRoute = computed(() => route.path);

const isPasswordModalOpen = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const handleLogout = async () => {
  try {
    await Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        store.dispatch("clearUser");
        router.push("/login");
      }
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to logout. Please try again.",
      icon: "error",
    });
  }
};

const validatePassword = password => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);

const handlePasswordChange = async () => {
  if (
    !passwordForm.value.currentPassword ||
    !passwordForm.value.newPassword ||
    !passwordForm.value.confirmPassword
  ) {
    Swal.fire({
      title: "Error",
      text: "Please fill in all password fields",
      icon: "error",
    });
    return;
  }

  if(!validatePassword(passwordForm.value.newPassword)){
    Swal.fire({
      title: "Error",
      text: "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
      icon: "error",
    });
    return;
  }
  
  const res = await axios.get(`http://localhost:8080/users/${token.value}`);
  const foundUser = res.data;
  const deCryptedPassword = bcrypt.compareSync(passwordForm.value.currentPassword, foundUser.password);
  console.log(deCryptedPassword);
  
  if(!foundUser){
    Swal.fire({
      title: "Error",
      text: "Wrong password",
      icon: "error",
    });
    return;
  }
  console.log(foundUser);
  if(!deCryptedPassword){
    Swal.fire({
      title: "Error",
      text: "Incorrect current password",
      icon: "error",
    });
    return;
  }
  if(passwordForm.value.currentPassword === passwordForm.value.newPassword){
    Swal.fire({
      title: "Error",
      text: "New password cannot be the same as the current password",
      icon: "error",
    });
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    Swal.fire({
      title: "Error",
      text: "New passwords do not match",
      icon: "error",
    });
    return;
  }
  const crytedPassword = bcrypt.hashSync(passwordForm.value.newPassword, 10);
  console.log(crytedPassword);
  
  const newUser = {...foundUser, password: crytedPassword}
  try {
    Swal.fire({
      title: "Success",
      text: "Password changed successfully",
      icon: "success",
    });

    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    store.dispatch("updateUser", {...newUser})
    isPasswordModalOpen.value = false;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Failed to change password. Please try again.",
      icon: "error",
    });
  }
};

onMounted(() => {
  if (!token.value) {
    Swal.fire({
      title: "Error",
      text: "You are not logged in. Please log in.",
      icon: "error",
      confirmButtonText: "Login",
    }).then((res) => {
      if (res.isConfirmed) router.push("/login");
    });
  }
});
</script>
