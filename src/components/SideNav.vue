<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside
        class="fixed left-0 z-40 w-64 h-screen transition-transform bg-gray-50 border-r border-gray-200"
        :class="{ '-translate-x-full': !showSide, 'translate-x-0': showSide }"
        aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- Logo Section -->
        <div class="pb-4 mb-4 border-b border-gray-200">
          <router-link to="/home" class="flex items-center ps-2.5">
            <span class="self-center text-xl font-semibold whitespace-nowrap">RM</span>
          </router-link>
        </div>

        <!-- Navigation Menu -->
        <ul class="space-y-2 font-medium">
          <li>
            <router-link
                to="/home"
                @click="handleNavClick"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                exact-active-class="bg-blue-100 text-blue-700"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span class="ms-3">Home</span>
            </router-link>
          </li>

          <li>
            <router-link
                to="/chatbot"
                @click="handleNavClick"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                exact-active-class="bg-blue-100 text-blue-700"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15c0 .966.784 1.75 1.75 1.75h3.75l3.75 3.75v-3.75h3.75c.966 0 1.75-.784 1.75-1.75V5.75c0-.966-.784-1.75-1.75-1.75H4c-.966 0-1.75.784-1.75 1.75v9.25z"
                />
              </svg>
              <span class="ms-3">Chatbot</span>
            </router-link>
          </li>

          <li>
            <router-link
                to="/menu"
                @click="handleNavClick"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                exact-active-class="bg-blue-100 text-blue-700"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15c0 .966.784 1.75 1.75 1.75h3.75l3.75 3.75v-3.75h3.75c.966 0 1.75-.784 1.75-1.75V5.75c0-.966-.784-1.75-1.75-1.75H4c-.966 0-1.75.784-1.75 1.75v9.25z"
                />
              </svg>
              <span class="ms-3">Menu</span>
            </router-link>
          </li>
        </ul>

        <!-- Logout Section -->
        <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
          <li>
            <button
                @click="showLogoutConfirm = true"
                class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
              <span class="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col w-full sm:ml-64">
      <!-- Top Navigation -->
      <div class="sticky top-0 bg-white h-[50px] flex items-center shadow-sm px-4 border-b z-10">
        <button
            @click="toggleSideBar"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div class="border-2 border-gray-200 border-dashed rounded-lg p-4 h-full">
          <div
              v-if="showSuccessMessage"
              class="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded"
              role="alert"
          >
            <strong class="font-bold">Success\!</strong>
            <span class="block sm:inline"> You have successfully logged out.</span>
          </div>
          <router-view />
        </div>
      </div>
    </div>

    <LogoutModal
        :show="showLogoutConfirm"
        @confirm-logout="logout"
        @close="showLogoutConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import LogoutModal from '../components/LogoutModal.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();

const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
const showDropDown = ref(false);
const showSide = ref(true);
const showSuccessMessage = ref(false);
const showLogoutConfirm = ref(false);
const restaurantManagementDropdown = ref(false);

const restaurantManagement = computed(() => {
  return route.path === '/menu' || route.path === '/chat-history';
});

const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

const handleResize = () => {
  showSide.value = window.innerWidth >= 992;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  store.commit('setUser', null);
  store.commit('setJwtToken', null);
  showSuccessMessage.value = true;
  router.push("/login");
};

const navigateTo = (page) => {
  if (page === 'home') {
    router.push('/home');
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const toggleDrop = () => {
  showDropDown.value = !showDropDown.value;
};

const toggleUserManagementDropdown = () => {
  showUserManagementDropdown.value = !showUserManagementDropdown.value;
};

const handleNavClick = () => {
  if (window.innerWidth < 992) {
    showSide.value = false;
  }
};
</script>

<style>
/* Using Tailwind classes directly, no extra style needed here */
</style>
