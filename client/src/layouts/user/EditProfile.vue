<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Your Profile</h1>
      <div class="max-w-2xl mx-auto bg-gray-100 rounded-lg p-8">
        <form>
          <div class="mb-6">
            <label
              for="avatar"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Profile Picture</label
            >
            <div class="flex items-center">
              <img
                src=""
                alt="Profile Picture"
                class="w-20 h-20 rounded-full mr-4"
              />
              <input type="file" id="avatar" accept="image/*" class="hidden" />
              <button
                type="button"
                class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300"
              >
                Change Picture
              </button>
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
              type="email"
              id="email"
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
            <input
              type="tel"
              id="phone"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div class="flex justify-end mt-6">
            <button
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
<script setup></script>
<style scoped></style>
