<template>
  <div
    class="w-full h-screen text-white flex justify-center items-center bg-gradient-to-t from-black to-[#111]"
  >
    <form
      @submit.prevent="handleSignUp"
      class="p-[16px] w-2/5 rounded bg-black border border-[#111]"
    >
      <h2 class="text-[40px] font-[600] p-[16px] text-center"> Đăng ký </h2>

      <div class="grid grid-cols-2 w-full">
        <div
          v-for="(field, index) in fields.slice(0, -1)"
          :key="index"
          class="flex flex-col mb-[30px] relative px-[20px] gap-[5px]"
        >
          <label :for="field.name" class="text-[16px]">{{ field.label }}</label>
          <input
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="user[field.name]"
            :id="field.name"
            @input="empty[field.name] = true"
            class="w-full outline-none rounded p-[10px] border-[1px] bg-[#222]"
          />
          <p
            v-if="!user[field.name] && empty[field.name]"
            class="text-[red] text-[14px] bottom-[-30px] absolute"
          >
            {{ field.label }} không được để trống
          </p>
          <p
            v-else-if="
              field.name === 'phone' &&
              !validatePhone(user.phone) &&
              empty.phone
            "
            class="text-[red] text-[12px] bottom-[-30px] absolute"
          >
            Số điện thoại phải bắt đầu bằng 0 và có 11 ký tự
          </p>
          <p
            v-else-if="
              field.name === 'email' &&
              empty.email &&
              !validateEmail(user.email)
            "
            class="text-[red] text-[14px] bottom-[-30px] absolute"
          >
            Email không đúng định dạng
          </p>
          <p
            v-else-if="
              field.name === 'password' &&
              empty.password &&
              !validatePassword(user.password)
            "
            class="text-[red] text-[14px] bottom-[-30px] absolute"
          >
            {{ passwordError }}
          </p>
          <p
            v-if="field.name === 'confirmpassword' && wrongrepassword"
            class="text-[red] text-[14px] bottom-[-30px] absolute"
          >
            Mật khẩu không đúng
          </p>
        </div>
      </div>

      <div
        v-for="(field, index) in fields.slice(-1)"
        :key="index"
        class="flex flex-col mb-[40px] relative px-[50px] gap-[10px]"
      >
        <label :for="field.name" class="text-[16px]">{{ field.label }}</label>
        <input
          :type="field.type"
          :placeholder="field.placeholder"
          v-model="user[field.name]"
          :id="field.name"
          @input="empty[field.name] = true"
          class="w-full pl-[10px] outline-none rounded p-[10px] border-[1px] bg-[#222]"
        />

        <p
          v-if="!user[field.name] && empty[field.name]"
          class="text-[red] text-[14px] bottom-[-30px] absolute"
        >
          {{ field.label }} không được để trống
        </p>
      </div>

      <div class="px-[50px] relative mt-[50px] mb-[30px]">
        <button
          class="bg-[#08f] text-[16px] font-[700] text-black rounded w-full p-[10px]"
        >
          Đăng ký
        </button>
      </div>

      <div class="flex px-[50px] justify-center gap-1">
        <p class="text-[#bbb]">Đã có tài khoản</p>
        <p @click="toLogin" class="hover:underline cursor-pointer">Đăng nhập</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import bcrypt from "bcryptjs";
import { useStore } from "vuex";

const store = useStore();
const existedEmail = ref(false);
const wrongrepassword = ref(false);

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const confirmpassword = ref("");

const passwordError = ref("");

const validatePassword = (password) => {
  const minLength = 6;
  const letterPattern = /[A-Za-z]/;
  const numberPattern = /[0-9]/;
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    passwordError.value = `Mật khẩu phải có ít nhất ${minLength} ký tự.`;
  } else if (!letterPattern.test(password)) {
    passwordError.value = "Mật khẩu phải chứa ít nhất một chữ cái.";
  } else if (!numberPattern.test(password)) {
    passwordError.value = "Mật khẩu phải chứa ít nhất một chữ số.";
  } else if (!specialCharPattern.test(password)) {
    passwordError.value = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.";
  } else {
    passwordError.value = "";
    return true;
  }
  return false;
};

const empty = reactive({
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  confirmpassword: false,
  phone: false,
  address: false,
});

const user = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  phone: "",
  address: "",
});

const router = useRouter();

const toLogin = () => {
  router.push({ path: "/login" });
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const validatePhone = (phone) => {
  const phonePattern = /^0\d{10}$/;
  return phonePattern.test(phone);
};

const handleSignUp = async () => {
  if (
    Object.values(empty).some((val) => val === false) ||
    !validateEmail(user.email) ||
    !validatePassword(user.password) ||
    user.password !== user.confirmpassword ||
    !validatePhone(user.phone)
  ) {
    if (user.password !== user.confirmpassword) {
      wrongrepassword.value = true;
    }
    return;
  }

  const res = await axios.get(
    `http://localhost:8080/users?email=${user.email}`
  );
  if (res.data.length > 0) {
    return Swal.fire({
      title: "Tài khoản đã tồn tại!",
      icon: "error",
    });
  }

  const cryptedPassword = bcrypt.hashSync(user.password, 10);
  const newUser = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone.startsWith("0")
      ? "+84" + user.phone.slice(1)
      : "+84" + user.phone,
    address: user.address,
    id: Math.floor(Math.random() * 100000000),
    password: cryptedPassword,
    role: false,
    status: true,
    avatar: "",
    created_at: formatDate(new Date()),
    updated_at: formatDate(new Date()),
  };
  Swal.fire({
    title: "Đăng ký thành công!",
    icon: "success",
    confirmButtonText: "OK",
  }).then((res) => {
    if (res.isConfirmed) {
      store.dispatch("createUser", newUser);
      router.push({ path: "/login" });
    }
  });
};

const fields = [
  { name: "firstname", label: "Họ", type: "text", placeholder: "Nhập họ" },
  { name: "lastname", label: "Tên", type: "text", placeholder: "Nhập tên" },
  { name: "email", label: "Email", type: "email", placeholder: "Nhập email" },
  {
    name: "phone",
    label: "Số điện thoại",
    type: "text",
    placeholder: "Nhập số điện thoại",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
  },
  {
    name: "confirmpassword",
    label: "Xác nhận mật khẩu",
    type: "password",
    placeholder: "Nhập lại mật khẩu",
  },
  {
    name: "address",
    label: "Địa chỉ",
    type: "text",
    placeholder: "Nhập địa chỉ",
  },
];
</script>
