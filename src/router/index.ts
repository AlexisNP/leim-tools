import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CalendarPage from '@/views/CalendarPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: HomePage
    },
    {
      path: '/calendrier',
      name: 'calendrier',
      component: CalendarPage
    }
  ]
})

export default router
