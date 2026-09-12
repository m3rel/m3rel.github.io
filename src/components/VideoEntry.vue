<script setup>
defineProps({ id: String, title: String, description: String })
</script>

<template>
  <div class="entry">
    <RouterLink :to="{ name: 'watch', params: { id } }" class="thumb">
      <img :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`" :alt="title" />
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
