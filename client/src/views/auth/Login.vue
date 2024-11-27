<template>
  <div
    class="w-full h-screen text-white flex justify-center items-center bg-gradient-to-t from-black to-[#111]"
  >
    <v-form
      @submit.prevent="handleLogin"
      class="p-[16px] w-[600px] rounded bg-black border border-[#111]"
    >
      <h2 class="text-[40px] font-[600] p-[16px] text-center">Login</h2>

      <div class="flex flex-col mb-[40px] relative px-[50px] gap-[10px]">
        <label class="text-[20px]">Email</label>
        <input
          placeholder="Email"
          v-model="user.email"
          @input="empty.email = true"
          class="w-full pl-[10px] outline-none rounded p-[10px] border-[1px] bg-[#222]"
          type="text"
        />
        <p
          v-if="empty.email && !user.email"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
        Email is requied
        </p>
        <p
          v-else-if="wrong"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Incorrct email or password
        </p>
      </div>

      <div class="flex flex-col mb-[40px] relative px-[50px] gap-[10px]">
        <label class="text-[20px]">Password</label>
        <input
          placeholder="Password"
          v-model="user.password"
          @input="empty.password = true"
          class="w-full pl-[10px] outline-none rounded p-[10px] border-[1px] bg-[#222]"
          type="password"
        />
        <p
          v-if="empty.password && !user.password"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Password is required
        </p>
        <p
          v-else-if="wrong"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Incorrrect email or password
        </p>
      </div>

      <div class="px-[50px] relative mt-[50px] mb-[30px]">
        <button
          class="bg-[#08f] text-[16px] font-[700] text-black rounded w-full p-[10px]"
          >Login</button
        >
      </div>

      <div class="flex px-[50px] justify-center gap-1">
        <p class="text-[#bbb]">Don't have a account?</p>
        <p @click="toRegister" class="hover:underline cursor-pointer"
          >Register</p
        >
      </div>
    </v-form>
  </div>
</template>
<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";

const empty = reactive({
  email: false,
  password: false,
});

const wrong = ref(false);

const user = reactive({
  email: "",
  password: "",
});
const router = useRouter();

const toRegister = () => {
  router.push({ path: "/register" });
};

const handleLogin = async () => {
  if (!user.email || !user.password) {
    empty.email = true;
    empty.password = true;
    setTimeout(() => {
      empty.email = false;
      empty.password = false;
    }, 2000);
    return;
  }
  empty.email = false;
  empty.password = false;
  const res = await axios.get(
    `http://localhost:8080/users?email=${user.email}`
  );
  if (res.data.length === 0) {
    wrong.value = true;
    setTimeout(() => {
      wrong.value = false;
    }, 2000);
    return;
  }
  const data = res.data[0];
  const decryptedPassword = bcrypt.compareSync(user.password, data.password);
  if (!decryptedPassword) {
    wrong.value = true;
    setTimeout(() => {
      wrong.value = false;
    }, 2000);
    return;
  }
  return Swal.fire({
    title: "Success!",
    text: "Logged in successfully!",
    icon: "success",
    confirmButtonText: "OK",
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.setItem("token", JSON.stringify(data.id));
      router.push({ path: "/home" });
    }
  });
};
</script>
<style scoped></style>
