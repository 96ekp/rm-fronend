<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Restaurant Menu</h1>
      <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </div>
    <hr class="my-4 border-t border-gray-300" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="item in menuItems"
          :key="item.id"
          class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <img
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.menu_name"
            class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{ item.menu_name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import AddMenuModal from '@/components/AddMenuModal.vue';


const openModal = () => {
  AddMenuModal.showModal.value = true;
};

const menuItems = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/api/v1/menus');
    menuItems.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Access forbidden: Invalid or missing token');
      // window.location.href = '/login';
    } else {
      console.error('Failed to fetch menu items:', error);
    }
  }
});
</script>
