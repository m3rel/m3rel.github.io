<script setup>
import { ref } from 'vue'

const props = defineProps({ id: String, title: String, description: String })

const src = ref(`https://img.youtube.com/vi/${props.id}/maxresdefault.jpg`)

function checkImage(e) {
  // YouTube's "missing maxres" placeholder is 120px wide
  if (e.target.naturalWidth <= 120) {
    src.value = `https://img.youtube.com/vi/${props.id}/hqdefault.jpg`
  }
}
</script>

<template>
  <div class="entry">
    <RouterLink :to="{ name: 'watch', params: { id } }" class="thumb">
      <img :src="src" :alt="title" @load="checkImage" />
    </RouterLink>

    <div class="caption">
      <h3>{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.entry {
  display: flex;
  align-items: stretch;
  gap: 20px;
}

.thumb {
  flex: 0 0 600px; /* fixed thumbnail width, adjust to taste */
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: block;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  flex: 1;
  border: 1px dashed #000;
  padding: 10px 14px;
  font-size: 0.85rem;
}
.caption h3 {
  font-weight: normal;
  margin-bottom: 8px;
}
</style>
