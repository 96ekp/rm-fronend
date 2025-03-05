<template>
  <div class="flex w-screen h-screen">
    <!-- Side bar -->
    <div class="w-[400px] h-full bg-bg text-text" v-show="showSide">
      <div class="h-[50px] bg-primary flex justify-start items-center">
        <div class="px-[20px]">
          <router-link to="/home" class="text-xl font-bold">
            RM
          </router-link>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-primary py-[10px]">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[20px]">
          <!--Side nav-->
          <div class="flex flex-col justify-between space-y-[20px]" >

            <!-- start Home -->
            <div :class="{ 'hidden': !showSide }" class="sidebar">
              <router-link to="/home" @click="handleNavClick" class="inline-flex relative items-center py-[10px] px-[10px] w-full lg:text-md md:text-base sm:text-xs font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out" exact-active-class="active-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                Home
              </router-link>
            </div>
            <!-- end home-->

            <!-- start Chatbot -->
            <div :class="{ 'hidden': !showSide }" class="sidebar">
              <router-link to="/chatbot" @click="handleNavClick" class="inline-flex relative items-center py-[10px] px-[10px] w-full lg:text-md md:text-base sm:text-xs font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out" exact-active-class="active-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 15c0 .966.784 1.75 1.75 1.75h3.75l3.75 3.75v-3.75h3.75c.966 0 1.75-.784 1.75-1.75V5.75c0-.966-.784-1.75-1.75-1.75H4c-.966 0-1.75.784-1.75 1.75v9.25z" />
                </svg>
                Chatbot
              </router-link>
            </div>
            <!-- end Chatbot -->
          </div>

          <div class="h-[50px]">
            <div class="flex items-center justify-between ">
              <button @click="showLogoutConfirm = true" class="inline-flex relative items-center lg:text-md md:text-base sm:text-xs py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <LogoutModal :show="showLogoutConfirm" @confirm-logout="logout" @close="showLogoutConfirm = false" />
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="w-full h-full bg-gray-400">
      <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
        <!-- Add progress navigation bar to show the progress bar Eg. Resident List > Create resident -->
        <!-- Hamburger menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[25px] h-[25px]">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32-14.3 32-32z" />
          </svg>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
        <div class="border rounded-md p-[20px] h-full">
          <!-- Success message -->
          <div v-if="showSuccessMessage" class="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded" role="alert">
            <strong class="font-bold">Success!</strong>
            <span class="block sm:inline"> You have successfully logged out.</span>
          </div>
          <router-view />
        </div>
      </div>
    </div>
    <!-- Main -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import LogoutModal from '../components/LogoutModal.vue'
import ChatBot from '../components/ChatBot.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();

const username = computed(() => store.getters.getUser?.username || "Guest");
const role = computed(() => store.getters.getRole);
const showDropDown = ref(false);
const showSide = ref(true);
const showSuccessMessage = ref(false);
const showLogoutConfirm = ref(false)
const restaurantManagementDropdown = ref(false);

const restaurantManagement = computed(() => {
  return route.path === '/menu' || route.path === '/chat-history';
});

// hide show side bar
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

// Handle window resize to auto-show/hide sidebar
const handleResize = () => {
  showSide.value = window.innerWidth >= 992;
};

const logout = () => {
  // Remove token and user from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Clear user data in Vuex store
  store.commit('setUser', null);
  store.commit('setJwtToken', null);

  // Show the success message
  showSuccessMessage.value = true;

  // Redirect to login page
  router.push("/login");
};

// add breadcrumbs
const navigateTo = (page) => {
  if (page === 'home') {
    router.push('/home');
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial size
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// toggle user
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
/* Add your styles here */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.active-link {
  background-color: #e2e8f0; /* Example background color for active link */
  color: #1a202c; /* Example text color for active link */
}

.container{
  align-items: center;
  position: absolute;
  bottom: 100px;
  left: 16px;
  font-size: 16px;
  color:#1a202c;
}
#userN{
  position: relative;
  color: #1a202c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  left:20px;
}

#userR{
  position: relative;
  left:20px;
  color: #1a202c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;

}

@media (max-width: 767px) {
  #title {
    text-align: center;
    color: #1a202c;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    border-bottom: 1px solid #1a202c;
    width: 30%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #title {
    text-align: center;
    color: #1a202c;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 25px;
    border-bottom: 1px solid #1a202c;
    width: 20%;
  }
}

@media (min-width: 992px) {
  #title {
    padding: 10px;
    text-align: center;
    color: #1a202c;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    border-bottom: 1px solid #1a202c;
    width: 14%;
  }
}
</style>
