<!-- Menu.vue -->
<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Menus</h1>
      <button @click="openModal" class="bg-primary text-white px-4 py-2 rounded">ADD</button>
      <AddMenuModal :showModal="showModal" :closeModal="closeModal" />
      <EditMenuModal :showModal="showEditModal" :closeModal="closeEditModal" :menu="selectedMenuItem" />
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
        <div class="p-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ item.menu_name }}</h2>
          <div>
            <!-- Edit button -->
            <button @click="editMenu(item)" class="ml-2 text-info hover:text-blue-600">
              <i class="fas fa-edit"></i>
            </button>
            <!-- Delete button -->
            <button @click="onDelete(item.id)" class="ml-2 text-info hover:text-red-600">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import apiClient from '@/services/AxiosClient.js';
import AddMenuModal from '@/components/AddMenuModal.vue';
import EditMenuModal from '@/components/EditMenuModal.vue';

const showModal = ref(false);
const showEditModal = ref(false);
const selectedMenuItem = ref(null);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const menuItems = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get('/api/v1/menus');
    menuItems.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Access forbidden: Invalid or missing token');
    } else {
      console.error('Failed to fetch menu items:', error);
    }
  }
});

const onDelete = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await apiClient.delete(`/api/v1/menus/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    menuItems.value = menuItems.value.filter(item => item.id !== id);
  } catch (error) {
    console.error('Failed to delete menu item:', error);
  }
};

const editMenu = (item) => {
  selectedMenuItem.value = item;
  showEditModal.value = true;
};
</script>
