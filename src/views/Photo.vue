<script setup>
//loops through entries in index.js in content/photo
//1 photoentry.vue per item in index.js

import PhotoEntry from '@/components/PhotoEntry.vue'
import entries from '@/content/photo/index.js'

</script>

<template>
  <div class="photo-page">

    <div class="header-row">
      <RouterLink to="/" class="back-link">← back</RouterLink>
      <h1 class="header-text">photo archive 💾</h1>
      <p class="scroll-hint">scroll horizontally →</p>
    </div>

    <PhotoEntry
        v-for="(entry, i) in entries"
        :key="i"
        :photos="entry.photos"
        :date="entry.date"
        :caption="entry.caption"
    />
  </div>

</template>

<style scoped>
.photo-page {
  font-family: 'Fragment Mono', monospace;
  //padding-top: 10px;
  //padding-bottom: 10px;
}

.header-text {
  //display: flex;
  //flex-direction: column;
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
  padding: 5px 10px
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  font-size: 20px;
  font-weight: normal;
  padding: 20px;
}

.scroll-hint {
  justify-self: right;
  color: #ff0000;
  font-size: 0.9rem;
  padding: 0 10px;
}


</style>