import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'compass' },
    },
    {
      path: '/compass',
      name: 'compass',
      component: () => import('../views/LifeCompass.vue'),
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../views/JournalView.vue'),
    },
    // {
    //   path: '/journal/history',
    //   name: 'JournalHistory',
    //   component: () => import('@/views/JournalHistory.vue'), // Optional for now
    // },
    {
      path: '/challenge',
      name: 'Challenge',
      component: () => import('@/views/Challenge.vue'), // Next in flow
    },
  ],
})

export default router
