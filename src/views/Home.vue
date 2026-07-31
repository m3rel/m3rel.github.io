<script setup>
import DashedBox from "@/components/DashedBox.vue"
</script>

<template>
  <div class="wrapper">
    <DashedBox text="writing 📒" slug="writing" />
    <DashedBox text="zines 🧃" slug="zines" />
    <DashedBox text="art ✂️" slug="art" />
    <DashedBox text="video 📹" slug="video" />
    <DashedBox text="photo 💾" slug="photo" />
    <DashedBox text="development 💻" slug="development" />
    <DashedBox text="about me 🐞" slug="about" />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
}
</style>