// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Admin.vue'),
      },
      {
        path: '/agendar',
        name: 'agendar',
        component: () => import(/* webpackChunkName: "home" */ '@/views/CreateAppointment.vue'),
      },
      {
        path: '/meus-atendimentos',
        name: 'clientepagina',
        component: () => import(/* webpackChunkName: "home" */ '@/views/ClientePage.vue'),
      },
      {
        path: '/staff',
        name: 'staffpagina',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Staff.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "home" */ '@/views/UserProfile.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
