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
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
          />
        </div>
        <div class="mb-4">
          <label for="menuImage" class="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
              @change="handleImageUpload"
              type="file"
              id="menuImage"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
              required
          />
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Image Preview" class="w-full h-48 object-cover rounded-md" />
          </div>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Menu</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/AxiosClient.js';

const showModal = ref(false);
const menuName = ref('');
const menuImage = ref(null);
const imagePreview = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    menuImage.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('menu_name', menuName.value);
  formData.append('image', menuImage.value);

  try {
    const response = await apiClient.post('/api/v1/menus', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    console.log(response.data);
    closeModal();
  } catch (error) {
    console.error('Failed to add menu:', error);
  }
};

const closeModal = () => {
  showModal.value = false;
  menuName.value = '';
  menuImage.value = null;
  imagePreview.value = null;
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
