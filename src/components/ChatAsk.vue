<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-pink-100 to-indigo-100">
    <div class="w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl">
      <!-- AI Header -->
      <div class="flex flex-col items-center space-y-2 text-center">
        <span class="text-2xl font-medium text-gray-900">Ask our AI anything</span>
        <span class="text-sm text-gray-500">Suggestions on what to ask Our AI</span>
        <div v-if="showSuggestions" class="flex space-x-2">
          <button @click="useSuggestion('What can I ask you to do?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">What can I ask you to do?</button>
          <button @click="useSuggestion('Which one of my projects is performing the best?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">Which one of my projects is performing the best?</button>
          <button @click="useSuggestion('What projects should I be concerned about?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">What projects should I be concerned about?</button>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="h-[400px] overflow-y-auto p-4 space-y-3">
        <div v-for="(msg, idx) in messages" :key="idx" 
             :class="msg.sender === 'AI' ? ' bg-gray-200 text-left' : 'bg-blue-500 text-white text-right justify-end'"
             class="px-4 py-2 rounded-lg max-w-[75%] shadow">
          <span>{{ msg.text }}</span>
        </div>
        <div v-if="loading" class="flex justify-center">
          <img src="@/assets/imgs/loader.svg" alt="Loading..." class="w-16 h-16" />
        </div>
      </div>

      <!-- Chat Input -->
      <form @submit.prevent="sendMessage" class="flex items-center p-2 mt-4 bg-gray-100 border rounded-full">
        <input
          v-model="userMessage"
          type="text"
          placeholder="Ask me anything about your projects"
          class="flex-1 px-4 py-2 bg-transparent focus:outline-none"
        />
        <button type="submit" class="p-2 text-gray-600 hover:text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l7-7-7-7M5 12h14"></path>
          </svg>
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
const loading = ref(false);
const showSuggestions = ref(true);

async function sendMessage() {
  if (!userMessage.value.trim()) return;
  messages.value.push({ sender: 'You', text: userMessage.value });
  loading.value = true;
  showSuggestions.value = false;

  try {
    const response = await apiClient.get(`/api/v1/openai/ask?prompt=${encodeURIComponent(userMessage.value)}`);
    messages.value.push({ sender: 'AI', text: response?.data || 'No response' });
  } catch (err) {
    messages.value.push({ sender: 'AI', text: 'Error: Unable to fetch response' });
  } finally {
    loading.value = false;
  }
  userMessage.value = '';
}

function useSuggestion(suggestion) {
  userMessage.value = suggestion;
  showSuggestions.value = false;
  sendMessage();
}
</script>