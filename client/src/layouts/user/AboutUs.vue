<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="relative bg-gray-900 text-white py-24">
        <div class="absolute inset-0 overflow-hidden">
          
        </div>
        <div class="relative container mx-auto px-4">
          <h1 class="text-5xl font-bold mb-6">Our Story</h1>
          <p class="text-xl max-w-2xl">
            We're passionate about delivering exceptional products and experiences to our customers. 
            Founded in 2020, we've grown from a small startup to a trusted brand in the industry.
          </p>
        </div>
      </div>
  
      <!-- Mission & Values -->
      <div class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-16">Our Values</h2>
          <div class="grid md:grid-cols-3 gap-12">
            <div class="text-center">
              <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <font-awesome-icon icon="bullseye" class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Mission</h3>
              <p class="text-gray-600">
                To provide innovative solutions that empower our customers to achieve their goals.
              </p>
            </div>
            <div class="text-center">
              <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <font-awesome-icon icon="eye" class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Vision</h3>
              <p class="text-gray-600">
                To become the leading provider of quality products and exceptional service in our industry.
              </p>
            </div>
            <div class="text-center">
              <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <font-awesome-icon icon="heart" class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Values</h3>
              <p class="text-gray-600">
                Integrity, innovation, and customer satisfaction guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Company Stats -->
      <div class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <font-awesome-icon icon="users" class="h-8 w-8 mb-4 text-blue-400" />
              <div class="text-4xl font-bold mb-2">10K+</div>
              <div class="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <font-awesome-icon icon="globe" class="h-8 w-8 mb-4 text-blue-400" />
              <div class="text-4xl font-bold mb-2">30+</div>
              <div class="text-gray-400">Countries Served</div>
            </div>
            <div>
              <font-awesome-icon icon="certificate" class="h-8 w-8 mb-4 text-blue-400" />
              <div class="text-4xl font-bold mb-2">50+</div>
              <div class="text-gray-400">Team Members</div>
            </div>
            <div>
              <font-awesome-icon icon="award" class="h-8 w-8 mb-4 text-blue-400" />
              <div class="text-4xl font-bold mb-2">15+</div>
              <div class="text-gray-400">Industry Awards</div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Team Section -->
      
  
      <!-- Contact Section -->
      <div class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-16">Get in Touch</h2>
          <div class="grid md:grid-cols-3 gap-12">
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <font-awesome-icon icon="map-marker-alt" class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Visit Us</h3>
              <p class="text-gray-600">
                5 - Vu Trong Khanh<br />
                Ha Dong, Ha Noi
              </p>
            </div>
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <font-awesome-icon icon="phone" class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Call Us</h3>
              <p class="text-gray-600">
                +84 947 721 353<br />
                Mon-Fri, 8am-6pm
              </p>
            </div>
            <div class="text-center">
              <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <font-awesome-icon icon="envelope" class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-4">Email Us</h3>
              <p class="text-gray-600">
                cvtg@company.com<br />
                cvtg@company.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { 
    faBullseye, 
    faEye, 
    faHeart, 
    faUsers, 
    faGlobe, 
    faCertificate, 
    faAward,
    faMapMarkerAlt,
    faPhone,
    faEnvelope
  } from '@fortawesome/free-solid-svg-icons';
  import { 
    faLinkedin,
    faTwitter
  } from '@fortawesome/free-brands-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  library.add(
    faBullseye, 
    faEye, 
    faHeart, 
    faUsers, 
    faGlobe, 
    faCertificate, 
    faAward,
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
    faLinkedin,
    faTwitter
  );
  </script>