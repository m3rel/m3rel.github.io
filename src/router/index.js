import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Writing from '../views/Writing.vue'
import WritingPost from '../views/WritingPost.vue'
import Zines from '../views/Zines.vue'
import Photo from "@/views/Photo.vue";
import Video from '@/views/Video.vue'
import WatchVideo from '@/views/WatchVideo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/writing', component: Writing, name: 'writing' },
    { path: '/writing/:slug', component: WritingPost, name: 'writing-post' },
    { path: '/zines', component: Zines, name: 'zines' },
    { path: '/photo', component: Photo, name: 'photo' },
    { path: '/video', component: Video, name: 'video' },
    { path: '/video/:id', component: WatchVideo, name: 'watch' },
  ],
})

export default router
