<template>
  <div class="grid">
    <VideoEntry
      v-for="video in videos"
      :key="video.id"
      :id="video.id"
      :title="video.title"
      :description="video.description"
    />
  </div>
</template>

<script setup>
import VideoEntry from '@/components/VideoEntry.vue'

const videos = [
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
]
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.5rem;
}
</style>
