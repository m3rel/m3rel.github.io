<script setup>
defineProps({
  photos: { type: Array, required: true },
  date: { type: String, required: true },
  caption: { type: String, required: true },
})
</script>

<template>
  <div class="photo-strip">
    <img v-for="(photo, i) in photos" :key="i" :src="photo" class="strip-photo" />
  </div>

  <div class="entry-footer">
    <p class="date">{{ date }}</p>
    <p class="caption">{{ caption }}</p>
  </div>
</template>

<style scoped>
.photo-strip {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}

.photo-strip::-webkit-scrollbar {
  display: none; /* Chrome, Safari, newer Edge */
}

.strip-photo {
  height: 500px; /* fixed height, width adjusts naturally */
  flex-shrink: 0; /* prevents images from squishing to fit */
}

.entry-footer {
  font-family: Menlo, monospace;
  padding: 0 20px 100px;
  margin-top: 20px;
}

.caption {
  margin-top: 10px;
  font-size: 12px;
}

.date {
  font-size: 10px;
  color: blue;
}
</style>