<template>
  <div
    class="w-full h-screen text-white flex justify-center items-center bg-gradient-to-t from-black to-[#111]"
  >
    <v-form
      @submit.prevent="handleLogin"
      class="p-[16px] w-[600px] rounded bg-black border border-[#111]"
    >
      <h2 class="text-[40px] font-[600] p-[16px] text-center"
        >Đăng nhập Admin</h2
      >

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
          Email không được để trống
        </p>
        <p
          v-else-if="wrong"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Email hoặc mật khẩu không đúng
        </p>
      </div>

      <div class="flex flex-col mb-[40px] relative px-[50px] gap-[10px]">
        <label class="text-[20px]">Mật khẩu</label>
        <input
          placeholder="Mật khẩu"
          v-model="user.password"
          @input="empty.password = true"
          class="w-full pl-[10px] outline-none rounded p-[10px] border-[1px] bg-[#222]"
          type="password"
        />
        <p
          v-if="empty.password && !user.password"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Mật khẩu không được để trống
        </p>
        <p
          v-else-if="wrong"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          Email hoặc mật khẩu không đúng
        </p>
      </div>

      <div class="px-[50px] relative mt-[50px] mb-[30px]">
        <button
          class="bg-[#08f] text-[16px] font-[700] text-black rounded w-full p-[10px]"
          >Đăng nhập</button
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
  if (!data.role) {
    return Swal.fire({
      title: "Bạn không có quyền đăng nhập!",
      icon: "error",
      confirmButtonText: "OK",
    }).then((res) => {
      if (res.isConfirmed) {
        return;
      }
    });
  }
  return Swal.fire({
    title: "Đăng nhập thành công!",
    icon: "success",
    confirmButtonText: "OK",
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.setItem("token", JSON.stringify(data.id));
      router.push({ path: "/admin" });
    }
  });
};
</script>
<style scoped></style>
