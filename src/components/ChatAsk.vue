<!-- ChatAsk.vue -->
<template>
  <div class="grid grid-rows-[auto_1fr_auto] h-full bg-white">
    <!-- AI Header -->
    <div class="p-4">
      <div class="flex flex-col items-center space-y-2 text-center">
        <span class="text-2xl font-medium text-gray-900">Ask our AI anything</span>
        <span class="text-sm text-gray-500">Suggestions on what to ask Our AI</span>
        <div v-if="showSuggestions" class="flex space-x-2">
          <button @click="useSuggestion('What can I ask you to do?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">What can I ask you to do?</button>
          <button @click="useSuggestion('Which one of my projects is performing the best?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">Which one of my projects is performing the best?</button>
          <button @click="useSuggestion('What projects should I be concerned about?')" class="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">What projects should I be concerned about?</button>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <div class="overflow-y-auto p-3 space-y-4">
      <div v-for="(msg, idx) in messages" :key="idx" class="flex items-end" :class="{'justify-end': msg.sender !== 'AI'}">
        <div class="flex flex-col space-y-2 text-base leading-tight max-w-lg mx-2" :class="msg.sender === 'AI' ? 'order-2 items-start' : 'order-1 items-end'">
          <div>
            <span class="px-4 py-3 rounded-xl inline-block" :class="msg.sender === 'AI' ? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'">{{ msg.text }}</span>
          </div>
        </div>
        <img :src="msg.sender === 'AI' ? 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png' : 'https://i.pravatar.cc/100?img=7'" alt="" class="w-6 h-6 rounded-full" :class="msg.sender === 'AI' ? 'order-1' : 'order-2'">
      </div>
      <div v-if="loading" class="flex items-end">
        <div class="flex flex-col space-y-2 text-base leading-tight mx-2 order-2 items-start">
          <div><img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" alt="..." class="w-16 ml-6"></div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <form @submit.prevent="sendMessage" class="relative flex">
        <input
            v-model="userMessage"
            type="text"
            placeholder="Ask me anything about your projects"
            class="text-base w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
        />
        <div class="absolute right-2 inset-y-0 flex items-center">
          <button type="submit" class="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l7-7-7-7M5 12h14"></path>
            </svg>
          </button>
        </div>
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
