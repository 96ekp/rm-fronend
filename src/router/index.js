import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores/index'; 
import UserLogin from '../components/UserLogin.vue';
import SideNav from '../components/SideNav.vue';
import HomeView from '@/views/HomeView.vue';
import { checkLoginStatus } from '@/utils/checkLoginStatus';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLogin
    },
    {
      path: "/sidenav",
      name: "SideNav",
      component: SideNav,
      meta: { requiresAuth: true},
      children: [
        {
          path: "/home",
          name: "HomeView",
          component: HomeView,
          meta: { requiresAuth: true},
        },
      ],
    },
  ],
});
// Global navigation guard for authentication
router.beforeEach((to, from, next) => {
  checkLoginStatus();
  const token = localStorage.getItem('token');
  const userRole = store.state.role; // Access role from Vuex store state
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const roles = to.meta.roles;

  if (requiresAuth && !token) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else if (requiresAuth && roles && !roles.includes(userRole)) {
    // next({ name: 'login' }); // Redirect to home if not authorized
    next(false); // Prevent navigation if user does not have the required role
  } else {
    next(); // Proceed to the route
  }
  next();
});


// Add afterEach hook to hide sidebar on navigation
router.afterEach(() => {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && window.innerWidth < 768) {
    sidebar.classList.add('hidden');
  }
});


export default router;
