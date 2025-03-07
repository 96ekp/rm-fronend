<!-- EditMenuModal.vue -->
<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Edit Menu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="menuName" class="block text-sm font-medium text-gray-700">Menu Name</label>
          <input
              v-model="formData.menu_name"
              type="text"
              id="menuName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
          />
        </div>
        <div class="mb-4">
          <label for="menuImage" class="block text-sm font-medium text-gray-700">Image</label>
          <input
              @change="handleImageUpload"
              type="file"
              id="menuImage"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-primary hover:file:bg-red-100"
              accept="image/*"
          />
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Image Preview" class="w-full h-48 object-cover rounded-md" />
          </div>
          <div v-else-if="menu.imageUrl" class="mt-4">
            <img :src="menu.imageUrl" alt="Current Image" class="w-full h-48 object-cover rounded-md" />
          </div>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 px-4 py-2 bg-info text-white rounded-md ">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md ">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import apiClient from '@/services/AxiosClient.js';

const props = defineProps({
  showModal: Boolean,
  closeModal: Function,
  menu: Object
});

const emit = defineEmits(['menu-updated']);

const formData = ref({
  menu_name: '',
  imageUrl: null
});

const imagePreview = ref(null);
const imageFile = ref(null);

watch(() => props.menu, (newVal) => {
  if (newVal) {
    formData.value.menu_name = newVal.menu_name;
    formData.value.imageUrl = newVal.imageUrl;
    imagePreview.value = null;
    imageFile.value = null;
  }
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  const data = new FormData();
  data.append('menu_name', formData.value.menu_name);

  if (imageFile.value) {
    data.append('image', imageFile.value);
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await apiClient.put(`/api/v1/menus/${props.menu.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    emit('menu-updated', response.data);
    props.closeModal();
  } catch (error) {
    console.error('Failed to update menu:', error);
  }
};
</script>
