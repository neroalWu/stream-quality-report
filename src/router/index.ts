import { createRouter, createWebHistory } from 'vue-router'
import RecordView from '../views/RecordView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'record',
            component: RecordView
        },
        {
          path: '/stream',
          name: 'stream',

          component: () => import('../views/StreamView.vue')
        }
    ]
})

export default router
