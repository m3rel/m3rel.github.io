import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Writing from '../views/Writing.vue'
import WritingPost from '../views/WritingPost.vue'
import Zines from '../views/Zines.vue'
import Photo from "@/views/Photo.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/writing', component: Writing, name: 'writing' },
    { path: '/writing/:slug', component: WritingPost, name: 'writing-post' },
    { path: '/zines', component: Zines, name: 'zines' },
    { path: '/photo', component: Photo, name: 'photo' },
  ],
})

export default router
