<!-- AddMenuModal.vue -->
<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Add New Menu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="menuName" class="block text-sm font-medium text-gray-700">Menu Name</label>
          <input
              v-model="menuName"
              type="text"
              id="menuName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-info focus:border-info sm:text-sm"
              required
          />
        </div>
        <div class="mb-4">
          <label for="imageUrl">Image URL</label>
          <input v-model="imageUrl" type="url" id="imageUrl" placeholder="https://example.com/image.jpg" required />
        </div>
        <div v-if="imageUrl" class="mt-4">
          <img :src="imageUrl" alt="Image Preview" class="w-full h-48 object-cover" />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 px-4 py-2 bg-info text-white rounded-md hover:bg-text">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md transform-none">Add Menu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import apiClient from '@/services/AxiosClient.js';

const props = defineProps({
  showModal: Boolean,
  closeModal: {
    type: Function,
    required: true
  }
});

const menuName = ref('');
const imageUrl = ref('');

const handleSubmit = async () => {
  const data = {
    menu_name: menuName.value,
    imageUrl: imageUrl.value
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (!isValidUrl(imageUrl.value)) {
    console.error('Invalid image URL');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    await apiClient.post('/api/v1/menus', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    closeModal();
    window.location.href = '/menu'; // Redirect to Menu page
  } catch (error) {
    console.error('Failed to add menu:', error.response ? error.response.data : error.message);
  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
