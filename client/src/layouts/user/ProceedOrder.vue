<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Complete Your Order</h1>
        
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Order Summary -->
          <div class="lg:w-1/2">
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div >
                <div v-for="(item, index) in 2" :key="index" class="flex justify-between items-center mb-4">
                  <div>
                    <h3 class="font-semibold">item.title</h3>
                    <p class="text-gray-600">Quantity: item.quantity</p>
                  </div>
                  <span class="font-semibold">formatCurrency(item.price * item.quantity)</span>
                </div>
                <div class="border-t border-gray-200 mt-4 pt-4">
                  <div class="flex justify-between items-center">
                    <span class="text-xl font-semibold">Total</span>
                    <span class="text-2xl font-bold text-blue-600">format</span>
                  </div>
                </div>
              </div>
              <!-- <p class="text-gray-600">Your cart is empty.</p> -->
            </div>
          </div>
  
          <!-- Shipping and Payment Form -->
          <div class="lg:w-1/2">
            <form @submit.prevent="submitOrder" class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
              <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input type="text" id="name" v-model="shippingInfo.name" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div class="mb-4">
                <label for="address" class="block text-gray-700 text-sm font-bold mb-2">Address</label>
                <input type="text" id="address" v-model="shippingInfo.address" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div class="mb-4">
                <label for="city" class="block text-gray-700 text-sm font-bold mb-2">City</label>
                <input type="text" id="city" v-model="shippingInfo.city" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div class="mb-8">
                <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                <input type="text" id="postalCode" v-model="shippingInfo.postalCode" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
  
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Payment Information</h2>
              <div class="mb-4">
                <label for="cardNumber" class="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
                <input type="text" id="cardNumber" v-model="paymentInfo.cardNumber" required
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label for="expiryDate" class="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                  <input type="text" id="expiryDate" v-model="paymentInfo.expiryDate" placeholder="MM/YY" required
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label for="cvv" class="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                  <input type="text" id="cvv" v-model="paymentInfo.cvv" required
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
              </div>
  
              <button type="submit" 
                      class="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  const store = useStore()
  const router = useRouter();
  
  const cart = computed(() => store.state.cart)
  const totalAmount = computed(() => cart.value.reduce((total, item) => total + item.price * item.quantity, 0))
  
  const shippingInfo = ref({
    name: '',
    address: '',
    city: '',
    postalCode: ''
  })
  
  const paymentInfo = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }
  
  const submitOrder = () => {
    // Here you would typically send the order information to your backend
    console.log('Order submitted', { shippingInfo: shippingInfo.value, paymentInfo: paymentInfo.value, totalAmount: totalAmount.value })
    
    // After successful order submission, clear the cart and redirect to a confirmation page
    store.commit('clearCart')
    router.push('/order-confirmation')
  }
  </script>