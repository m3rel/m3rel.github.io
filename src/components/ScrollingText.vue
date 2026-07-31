<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: { type: String, default: 'hello' },
  speed: { type: Number, default: 2 },
  fontSize: { type: Number, default: 20 },
  color: { type: String, default: 'white' }
})

const canvasRef = ref(null)
let ctx, x, animationId

function resize() {
  const canvas = canvasRef.value
  const dpr = window.devicePixelRatio || 1
  canvas.width = canvas.offsetWidth * dpr
  canvas.height = canvas.offsetHeight * dpr
  ctx.scale(dpr, dpr)
}

function draw() {
  const canvas = canvasRef.value
  const dpr = window.devicePixelRatio || 1
  const cssWidth = canvas.width / dpr
  const cssHeight = canvas.height / dpr

  ctx.clearRect(0, 0, cssWidth, cssHeight)
  ctx.font = `${props.fontSize}px Arial`
  ctx.fillStyle = props.color
  ctx.textBaseline = 'middle'
  ctx.fillText(props.text, x, cssHeight / 2)

  x -= props.speed
  if (x < -ctx.measureText(props.text).width) {
    x = cssWidth
  }
  animationId = requestAnimationFrame(draw)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  x = canvasRef.value.width
  resize()
  window.addEventListener('resize', resize)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas ref="canvasRef" class="scrolling-canvas"></canvas>
</template>

<style scoped>
.scrolling-canvas {
  width: 100%;
  height: 40px;
  display: block;
  background: blue;
}
</style>