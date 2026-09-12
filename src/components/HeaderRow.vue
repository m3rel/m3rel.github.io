<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div class="header">
    <RouterLink to="/" class="back-link">← back</RouterLink>
    <h1 class="header-text">{{title}}</h1>
  </div>
</template>

<style scoped>
.header {
  font-family: Menlo, monospace;
}

.header-text {
  text-align: center;
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
