<script setup></script>

<template>
  <div class="dev-page">
    <div class="header-row">
      <RouterLink to="/" class="back-link">← back</RouterLink>
      <h1 class="header-text">code 💻</h1>
    </div>

    <div class="sketch-grid">
      <RouterLink to="/development/sketch1" class="sketch-tile">1</RouterLink>
      <RouterLink to="/development/sketch2" class="sketch-tile">2</RouterLink>
      <RouterLink to="/development/sketch3" class="sketch-tile">3</RouterLink>
      <RouterLink to="/development/sketch4" class="sketch-tile">4</RouterLink>
      <RouterLink to="/development/sketch5" class="sketch-tile">5</RouterLink>
      <RouterLink to="/development/sketch6" class="sketch-tile">6</RouterLink>
    </div>

    <iframe
      src="https://petracoding.github.io/pinterest/board.html?link=hahahahmerel/waag-inspo/&hideHeader=1&hideFooter=1&transparent=1"
      class="board-frame"
    ></iframe>
  </div>
</template>

<style scoped>
.board-frame {
  display: block; /* iframes are inline by default, which blocks auto margins */
  width: 90%; /* or e.g. 1200px */
  max-width: 1200px; /* optional cap on big screens */
  height: 80vh; /* iframes need an explicit height too */
  margin: 0 auto; /* centers it horizontally */
  border: none;
}

.dev-page {
  font-family: 'Fragment Mono', monospace;
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

.sketch-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem auto 0;
  background: #ffe26b;
  padding: 10px;
  width: 90%;
  max-width: 1000px;
  box-sizing: border-box;
  justify-content: center;
}

.sketch-tile {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6ba5ff;
  color: black;
  text-decoration: none;
  flex-shrink: 0;
}
</style>