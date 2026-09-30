<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

//sizes van de sketches zodat iframe size klopt
const sketchSizes = {
  sketch1: { width: 400, height: 400 },
  sketch2: { width: 400, height: 600 },
  sketch3: { width: 1000, height: 700 },
  sketch4: { width: 1200, height: 500 },
}

const currentSize = computed(() => {
  return sketchSizes[route.params.id] || { width: 1000, height: 700 } // fallback
})
</script>

<template>
  <div class="header-row">
    <RouterLink to="/development" class="back-link">← back</RouterLink>
  </div>

  <div class="sketch-page">
    <iframe
      :src="`/p5sketches/${route.params.id}.html`"
      class="sketch-frame"
      :style="{ width: currentSize.width + 'px', height: currentSize.height + 'px' }"
    ></iframe>
  </div>
</template>

<style scoped>
.sketch-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sketch-frame {
  border: none;
  display: block;
  max-width: 100%;
}

.back-link {
  display: inline-block;
  color: #000000;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 5px 10px;
}

.back-link:hover {
  text-decoration: underline;
}

.header-row {
  font-family: 'Fragment Mono', monospace;
  margin-bottom: 10px;
}
</style>
