<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="player">
    <iframe
      :src="`https://www.youtube.com/embed/${id}?autoplay=1&controls=0&rel=0&playsinline=1`"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.player {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.player iframe {
  width: 300%;
  height: 100%;
  margin-left: -100%;
}
</style>
