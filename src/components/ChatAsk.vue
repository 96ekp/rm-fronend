<template>
  <div class="flex flex-col items-center w-full h-[80vh] max-w-lg p-4 mx-auto bg-bg text-text">
    <div class="flex flex-col w-full h-full bg-base border rounded shadow">
      <transition-group name="fade" tag="div" class="flex-1 p-4 space-y-2 overflow-y-auto">
        <div
            v-for="(msg, idx) in messages"
            :key="idx"
            :class="{
            'text-left': msg.sender === 'AI',
            'text-right': msg.sender === 'You',
          }"
        >
          <p class="inline-block px-3 py-2 rounded-lg">
            <span class="mr-1 font-semibold">{{ msg.sender }}:</span>
            <span>{{ msg.text }}</span>
          </p>
        </div>
        <div v-if="loading" class="flex justify-center">
          <img src="@/assets/imgs/loader.svg" alt="Loading..." class="w-28 h-18" />
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
            class="px-4 text-white bg-primary hover:bg-accent"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import apiClient from '@/services/AxiosClient.js';

const messages = ref([]);
const userMessage = ref('');
const loading = ref(false);

async function sendMessage() {
  if (!userMessage.value.trim()) return;
  messages.value.push({sender: 'You', text: userMessage.value});
  loading.value = true;

  const token = localStorage.getItem("token");
  if (!token) {
    messages.value.push({sender: 'AI', text: 'Authorization token is missing.'});
    loading.value = false;
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const params = new URLSearchParams({
    prompt: userMessage.value
  });

  try {
    const response = await apiClient.get(`/api/v1/openai/ask?${params.toString()}`, {headers});
    messages.value.push({sender: 'AI', text: response?.data || 'No response'});
  } catch (err) {
    console.error('Error while fetching the response:', err);
    if (err.code === 'ERR_NETWORK') {
      messages.value.push({sender: 'AI', text: 'Network error: Please check your internet connection.'});
    } else if (err.response) {
      messages.value.push({sender: 'AI', text: `Error: ${err.response.status} - ${err.response.data}`});
    } else if (err.request) {
      messages.value.push({sender: 'AI', text: 'Network error: No response received from the server.'});
    } else {
      messages.value.push({sender: 'AI', text: `Error: ${err.message}`});
    }
  } finally {
    loading.value = false;
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
