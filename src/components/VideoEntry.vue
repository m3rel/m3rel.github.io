<script setup>
defineProps({ id: String, title: String, description: String })
</script>

<template>

  <RouterLink :to="{ name: 'watch', params: { id } }" class="entry">
    <div class="thumb">
      <img :src="`https://img.youtube.com/vi/${id}/maxresdefault.jpg`" :alt="title" />
    </div>
  </RouterLink>

  <h3>{{ title }}</h3>
  <p v-if="description">{{ description }}</p>
</template>

<style scoped>
.thumb {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
