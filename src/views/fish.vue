<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import fish0 from '@/assets/photos/fish/0.png'
import fish1 from '@/assets/photos/fish/1.png'
import fish2 from '@/assets/photos/fish/2.png'
import fish3 from '@/assets/photos/fish/3.png'
import fish4 from '@/assets/photos/fish/4.png'
import fish5 from '@/assets/photos/fish/5.png'

const container = ref(null)
const fishEls = ref([]) // template refs, filled by v-for

// ---- Settings ----
const FISH_COUNT = 12
const FISH_IMAGES = [fish0, fish1, fish2, fish3, fish4, fish5]

const FLEE_RADIUS = 200
const PUSH = 1.2
const FRICTION = 0.92
const MAX_SPEED = 12
const IDLE_SPEED = 0.4 // gentle wandering when the mouse is away

// Static data used by the template
const fishList = Array.from({ length: FISH_COUNT }, (_, i) => ({
  id: i,
  src: FISH_IMAGES[i % FISH_IMAGES.length],
  size: 10 + Math.random() * 8, // width as % of container (6-14%)
}))

// Mutable physics state (not reactive on purpose)
let state = []
let mouse = null
let ready = false
let rafId = null

function init() {
  const W = container.value.offsetWidth
  const H = container.value.offsetHeight

  state = fishList.map((f, i) => {
    const el = fishEls.value[i]
    const w = (f.size / 100) * W
    const h = el.offsetHeight || w
    const angle = Math.random() * Math.PI * 2
    return {
      x: Math.random() * (W - w),
      y: Math.random() * (H - h),
      vx: Math.cos(angle) * IDLE_SPEED,
      vy: Math.sin(angle) * IDLE_SPEED,
      flip: 1,
    }
  })
  ready = true
}

function onMouseMove(e) {
  const rect = container.value.getBoundingClientRect()
  mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

function onMouseLeave() {
  mouse = null
}

function tick() {
  if (ready) {
    const W = container.value.offsetWidth
    const H = container.value.offsetHeight

    for (let i = 0; i < state.length; i++) {
      const s = state[i]
      const el = fishEls.value[i]
      if (!el) continue

      const w = el.offsetWidth
      const h = el.offsetHeight
      const maxX = W - w
      const maxY = H - h

      // Flee from the mouse
      if (mouse) {
        const dx = s.x + w / 2 - mouse.x
        const dy = s.y + h / 2 - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist > 0 && dist < FLEE_RADIUS) {
          const strength = (1 - dist / FLEE_RADIUS) * PUSH
          s.vx += (dx / dist) * strength
          s.vy += (dy / dist) * strength
        }
      }

      // Idle wandering: small random nudges so they never fully stop
      s.vx += (Math.random() - 0.5) * 0.05
      s.vy += (Math.random() - 0.5) * 0.02

      s.vx *= FRICTION
      s.vy *= FRICTION

      // Keep a minimum cruising speed
      const speed = Math.hypot(s.vx, s.vy)
      if (speed < IDLE_SPEED && speed > 0) {
        s.vx = (s.vx / speed) * IDLE_SPEED
        s.vy = (s.vy / speed) * IDLE_SPEED
      }
      if (speed > MAX_SPEED) {
        s.vx = (s.vx / speed) * MAX_SPEED
        s.vy = (s.vy / speed) * MAX_SPEED
      }

      s.x += s.vx
      s.y += s.vy

      // Bounce off the edges
      if (s.x < 0) {
        s.x = 0
        s.vx = Math.abs(s.vx)
      }
      if (s.x > maxX) {
        s.x = maxX
        s.vx = -Math.abs(s.vx)
      }
      if (s.y < 0) {
        s.y = 0
        s.vy = Math.abs(s.vy)
      }
      if (s.y > maxY) {
        s.y = maxY
        s.vy = -Math.abs(s.vy)
      }

      if (Math.abs(s.vx) > 0.2) s.flip = s.vx < 0 ? -1 : 1

      el.style.transform = `translate(${s.x}px, ${s.y}px) scaleX(${s.flip})`
    }
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div ref="container" class="container" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <img class="bg" src="@/assets/photos/fish/bg.jpg" alt="background" @load="init" />
    <img
      v-for="f in fishList"
      :key="f.id"
      ref="fishEls"
      class="fish"
      :src="f.src"
      alt="fish"
      :style="{ width: f.size + '%' }"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: auto;
  overflow: hidden;
}

.bg {
  width: 100%;
  height: auto;
  display: block;
}

.fish {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  will-change: transform;
  pointer-events: none;
}
</style>
