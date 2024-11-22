import { createRouter, createWebHistory } from 'vue-router'
import CreateCharacter from '@/views/CreateCharacter.vue'
import SpellGenerator from '@/views/SpellGenerator.vue' // Import the SpellGenerator component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create-character',
      component: CreateCharacter,
    },
    {
      path: '/create-spell', // New route for spell generator
      name: 'create-spell',
      component: SpellGenerator, // Associating the route with the component
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
