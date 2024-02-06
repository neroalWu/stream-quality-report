import { createRouter, createWebHistory } from 'vue-router'
import SummaryView from '../views/SummaryView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'record',
            component: SummaryView
        },
        {
          path: '/detail',
          name: 'detail',

          component: () => import('../views/DetailView.vue')
        }
    ]
})

export default router
