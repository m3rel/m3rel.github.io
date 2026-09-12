<template>

  <HeaderRow :title="yum"></HeaderRow>



  <div class="video-page">
    <div class="header-row">
      <h1 class="header-text">video archive 📹</h1>
    </div>

    <div class="grid">
      <VideoEntry
        v-for="video in videos"
        :key="video.id"
        :id="video.id"
        :title="video.title"
        :description="video.description"
      />
    </div>
  </div>
</template>

<script setup>
import VideoEntry from '@/components/VideoEntry.vue'
import HeaderRow from '@/components/HeaderRow.vue'

const videos = [
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
  { id: 'hAVSqG60Vdg', title: '001 _ op de fiets naar texel', description: 'ye' },
]
</script>

<style scoped>
.grid {
  display: grid;
  align-items: center;
  gap: 5rem;
  max-width: 900px;
}

.video-page {
  font-family: 'Fragment Mono', monospace;
  margin: 0 auto;
}

.header-text {
  text-align: center;
}

.header-row {
  margin-bottom: 10px;
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

h1 {
  font-size: 20px;
  font-weight: normal;
  padding: 20px;
}
</style>
