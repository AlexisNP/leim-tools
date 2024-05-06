import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CalendarPage from '@/views/CalendarPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

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
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilePage
    }
  ]
})

export default router
