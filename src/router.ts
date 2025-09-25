import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'
import InputExamples from './docs/InputExamples.vue'
import LayoutExamples from './docs/LayoutExamples.vue'
import HomePage from './docs/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/inputs',
    name: 'Inputs',
    component: InputExamples,
  },
  {
    path: '/layouts',
    name: 'Layouts',
    component: LayoutExamples,
  },
  {
    path: '/overlays',
    name: 'Overlays',
    component: () => import('./docs/OverlayExamples.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory('/CustomComponents'),
  routes: routes,
})
