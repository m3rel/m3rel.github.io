<script setup>
  import posts from '@/content/writing/index.js'
</script>

<template>
    <div class="writing-page">
      <RouterLink to="/" class="back-link">← home</RouterLink>
      <h1>writing 📒</h1>

      <div class="post-grid">
        <RouterLink
            v-for="(post, i) in posts"
            :key="post.slug"
            :to="`/writing/${post.slug}`"
            class="post-box"
        >
          <span class="index">{{ String(i + 1).padStart(2, '0') }}.</span>
          <h2>{{ post.title }}</h2>
          <p class="date">{{ post.date }}</p>
          <p class="excerpt">{{ post.preview }}</p>
        </RouterLink>
      </div>
    </div>
</template>

<style scoped>
.writing-page {
  padding: 60px 40px;
  max-width: 1100px;
  margin: 0 auto;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 50px;
  font-weight: 400;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.post-box {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px #000000 dashed;
  border-radius: 10px;
  padding: 10px;
}

.index {
  font-size: 0.8rem;
  color: #999;
  letter-spacing: 0.05em;
}

.post-box h2 {
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 2px;
}

.date {
  font-size: 0.8rem;
  color: #888;
}

.excerpt {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin-top: 4px;
}

.post-box:hover h2 {
  text-decoration: underline;
}

.post-box:hover {
  border-color: red;
  background-color: #fff5d7;
}

</style>