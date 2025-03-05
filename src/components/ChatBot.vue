<template>
  <div class="flex flex-col items-center w-full h-screen max-w-lg p-4 mx-auto bg-gray-100">
    <div class="flex flex-col w-full h-full bg-white border rounded shadow">
      <transition-group name="fade" tag="div" class="flex-1 p-4 space-y-2 overflow-y-auto">
        <div
            v-for="(msg, idx) in messages"
            :key="idx"
            :class="{
            'text-left': msg.sender === 'AI',
            'text-right': msg.sender === 'You',
          }"
        >
          <p class="inline-block px-3 py-2 bg-gray-200 rounded-lg">
            <span class="mr-1 font-semibold">{{ msg.sender }}:</span>
            <span>{{ msg.text }}</span>
          </p>
        </div>
      </transition-group>
      <form @submit.prevent="sendMessage" class="flex border-t">
        <input
            v-model="userMessage"
            type="text"
            placeholder="Type your message..."
            class="w-full px-3 py-2 focus:outline-none"
        />
        <button
            type="submit"
            class="px-4 text-white bg-blue-500 hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/services/AxiosClient.js';

const messages = ref([]);
const userMessage = ref('');

async function sendMessage() {
  if (!userMessage.value.trim()) return;
  messages.value.push({ sender: 'You', text: userMessage.value });

  const token = localStorage.getItem("token");
  if (!token) {
    messages.value.push({ sender: 'AI', text: 'Authorization token is missing.' });
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const params = new URLSearchParams({
    ingredients: userMessage.value,
    cuisine: 'Asian', // You can change this to dynamic value if needed
    dietaryRestriction: 'gluten-free' // You can change this to dynamic value if needed
  });

  try {
    const response = await apiClient.get(`/api/v1/openai/recipe-creator?${params.toString()}`, { headers });
    messages.value.push({ sender: 'AI', text: response?.data || 'No response' });
  } catch (err) {
    console.error('Error while fetching the response:', err);
    if (err.response) {
      // Server responded with a status other than 200 range
      messages.value.push({ sender: 'AI', text: `Error: ${err.response.status} - ${err.response.data}` });
    } else if (err.request) {
      // Request was made but no response received
      messages.value.push({ sender: 'AI', text: 'Network error: No response received from the server.' });
    } else {
      // Something else happened while setting up the request
      messages.value.push({ sender: 'AI', text: `Error: ${err.message}` });
    }
  }
  userMessage.value = '';
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>