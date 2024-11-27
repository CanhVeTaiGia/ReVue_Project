<template>
  <div
    class="w-full h-screen text-white flex justify-center items-center bg-gradient-to-t from-black to-[#111]"
  >
    <form
      @submit.prevent="handleSignUp"
      class="p-[16px] w-3/5 rounded bg-black border border-[#111]"
    >
      <h2 class="text-[40px] font-[600] p-[16px] text-center"> Sign Up </h2>

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
            {{ field.label }} cannot be empty
          </p>
          <p
            v-else-if="
              field.name === 'phone' &&
              !validatePhone(user.phone) &&
              empty.phone
            "
            class="text-[red] text-[12px] bottom-[-30px] absolute"
          >
            The phone number must start with 0 and be 11 digits long
          </p>
          <p
            v-else-if="
              field.name === 'email' &&
              empty.email &&
              !validateEmail(user.email)
            "
            class="text-[red] text-[14px] bottom-[-30px] absolute"
          >
            Invalid email format
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
            class="text-[red] text-[12px] bottom-[-30px] absolute"
          >
            Passwords do not match
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
          {{ field.label }} cannot be empty
        </p>
      </div>

      <div class="px-[50px] relative mt-[50px] mb-[30px]">
        <button
        type="submit"
          class="bg-[#08f] text-[16px] font-[700] text-black rounded w-full p-[10px]"
        >
          Sign Up
        </button>
      </div>

      <div class="flex px-[50px] justify-center gap-1">
        <p class="text-[#bbb]">Already have an account</p>
        <p @click="toLogin" class="hover:underline cursor-pointer">Login</p>
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
    passwordError.value = `Password must be at least ${minLength} characters long.`;
  } else if (!letterPattern.test(password)) {
    passwordError.value = "Password must contain at least one letter.";
  } else if (!numberPattern.test(password)) {
    passwordError.value = "Password must contain at least one number.";
  } else if (!specialCharPattern.test(password)) {
    passwordError.value = "Password must contain at least one special character.";
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
      title: "Account already exists!",
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
    title: "Success!",
    text: "Signed up successfully",
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
  { name: "firstname", label: "First Name", type: "text", placeholder: "Enter first name" },
  { name: "lastname", label: "Last Name", type: "text", placeholder: "Enter last name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter phone number",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "confirmpassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm password",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
  },
];
</script>
