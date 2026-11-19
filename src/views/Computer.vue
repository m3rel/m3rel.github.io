<script setup>
import mainImg from '@/assets/photos/computer/main.png'
import frame1 from '@/assets/photos/computer/layer4.png'
import frame2 from '@/assets/photos/computer/layer8.png'
import frame3 from '@/assets/photos/computer/layer9.png'
import frame4 from '@/assets/photos/computer/blue.png'
import frame5 from '@/assets/photos/computer/orange.png'
import frame6 from '@/assets/photos/computer/pink1.png'
import frame7 from '@/assets/photos/computer/pink2.png'
import frame8 from '@/assets/photos/computer/white.png'
import frame9 from '@/assets/photos/computer/yellow.png'

import star1 from '@/assets/photos/computer/star1.png'
import star2 from '@/assets/photos/computer/star2.png'
import star3 from '@/assets/photos/computer/star3.png'

const MAIN_W = 2354
const MAIN_H = 2391

// dur = seconds per glitch cycle, delay = offset so they don't glitch in sync
// const frames = [
//   { src: frame1, alt: 'frame 1', x: 1130, y: 1410, w: 787, dur: 5, delay: 0 },
//   { src: frame2, alt: 'frame 2', x: 1400, y: 530, w: 405, dur: 7, delay: -2 },
//   { src: frame3, alt: 'frame 3', x: 1510, y: 910, w: 405, dur: 6, delay: -4 },
// ]
import { ref } from 'vue'

const frames = [
  {
    src: frame1,
    alt: 'frame 1',
    x: 1130,
    y: 1410,
    w: 787,
    dur: 5,
    delay: 0,
    star: { src: star1, x: 1350, y: 1550, w: 223 },
  },
  {
    src: frame2,
    alt: 'frame 2',
    x: 1400,
    y: 530,
    w: 405,
    dur: 7,
    delay: -2,
    star: { src: star2, x: 1500, y: 590, w: 229 },
  },
  {
    src: frame3,
    alt: 'frame 3',
    x: 1510,
    y: 910,
    w: 405,
    dur: 6,
    delay: -4,
  },
  {
    src: frame4,
    alt: 'frame 4',
    x: 1010,
    y: 510,
    w: 397,
    dur: 6,
    delay: -2,
  },
  {
    src: frame5,
    alt: 'frame 5',
    x: 950,
    y: 180,
    w: 409,
    dur: 6,
    delay: -4,
  },
  {
    src: frame6,
    alt: 'frame 6',
    x: 490,
    y: 380,
    w: 478,
    dur: 6,
    delay: 0,
  },
  {
    src: frame7,
    alt: 'frame 7',
    x: 470,
    y: 1400,
    w: 678,
    dur: 6,
    delay: 0,
  },
  {
    src: frame8,
    alt: 'frame 8',
    x: 580,
    y: 960,
    w: 455,
    dur: 6,
    delay: -2,
  },
  {
    src: frame9,
    alt: 'frame 9',
    x: 1020,
    y: 1000,
    w: 455,
    dur: 6,
    delay: -6,
  }

]

// which frame is hovered (index), or null
const hovered = ref(null)

// same pixel -> percentage conversion for frames AND stars
const pos = (o) => ({
  left: `${(o.x / MAIN_W) * 100}%`,
  top: `${(o.y / MAIN_H) * 100}%`,
  width: `${(o.w / MAIN_W) * 100}%`,
})

const style = (f) => ({
  ...pos(f),
  '--src': `url(${f.src})`,
  '--dur': `${f.dur}s`,
  '--delay': `${f.delay}s`,
})
</script>

<template>
  <div class="scene">
    <!-- behind: the moddable elements -->
    <div
      v-for="(f, i) in frames"
      :key="f.alt"
      class="layer glitch"
      :style="style(f)"
      @mouseenter="hovered = i"
      @mouseleave="hovered = null"
    >
      <img :src="f.src" :alt="f.alt" class="base" />
      <span class="tint" aria-hidden="true"></span>
      <span class="ghost red" aria-hidden="true"></span>
      <span class="ghost cyan" aria-hidden="true"></span>
    </div>

<!--    &lt;!&ndash; stars: positioned like the frames, shown when their frame is hovered &ndash;&gt;-->
<!--    <img-->
<!--      v-for="(f, i) in frames"-->
<!--      :key="'star-' + f.alt"-->
<!--      :src="f.star.src"-->
<!--      alt=""-->
<!--      aria-hidden="true"-->
<!--      class="star"-->
<!--      :class="{ on: hovered === i }"-->
<!--      :style="pos(f.star)"-->
<!--    />-->

    <!-- on top: the illustration with transparent frame holes -->
    <img :src="mainImg" alt="computer" class="main" />
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  width: 100vw;
}

.main {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.layer {
  position: absolute;
  z-index: 1;
}

.base {
  display: block;
  width: 100%;
  height: auto;
}

/* ---------- glitch ---------- */

/* tinted copies of the image: the image acts as a mask, so transparency is kept */
.ghost {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  -webkit-mask: var(--src) center / 100% 100% no-repeat;
  mask: var(--src) center / 100% 100% no-repeat;
}

.red {
  background: #ff2a4d;
  animation: slice-a var(--dur) steps(1, end) var(--delay) infinite;
}

.cyan {
  background: #00f0ff;
  animation: slice-b var(--dur) steps(1, end) var(--delay) infinite;
}

.base {
  animation: base-jitter var(--dur) steps(1, end) var(--delay) infinite;
}

/* quiet for ~85% of the cycle, then a short burst */
@keyframes slice-a {
  0%,
  85%,
  100% {
    opacity: 0;
  }
  86% {
    opacity: 1;
    clip-path: inset(10% 0 65% 0);
    transform: translate(-4%, 0);
  }
  88% {
    opacity: 1;
    clip-path: inset(55% 0 20% 0);
    transform: translate(3%, 0);
  }
  90% {
    opacity: 1;
    clip-path: inset(80% 0 4% 0);
    transform: translate(-2%, 0);
  }
  92% {
    opacity: 1;
    clip-path: inset(30% 0 45% 0);
    transform: translate(5%, 0);
  }
  94% {
    opacity: 0;
  }
}

@keyframes slice-b {
  0%,
  85%,
  100% {
    opacity: 0;
  }
  87% {
    opacity: 1;
    clip-path: inset(60% 0 15% 0);
    transform: translate(4%, 0);
  }
  89% {
    opacity: 1;
    clip-path: inset(5% 0 80% 0);
    transform: translate(-3%, 0);
  }
  91% {
    opacity: 1;
    clip-path: inset(40% 0 35% 0);
    transform: translate(2%, 0);
  }
  93% {
    opacity: 1;
    clip-path: inset(75% 0 8% 0);
    transform: translate(-5%, 0);
  }
  95% {
    opacity: 0;
  }
}

@keyframes base-jitter {
  0%,
  85%,
  100% {
    transform: none;
    filter: none;
  }
  87% {
    transform: translate(1.5%, 0) skewX(-2deg);
    filter: brightness(1.4) contrast(1.3);
  }
  90% {
    transform: translate(-1%, 0);
    filter: hue-rotate(40deg) saturate(2);
  }
  93% {
    transform: translate(0.5%, 0) skewX(1deg);
    filter: brightness(0.7);
  }
  95% {
    transform: none;
    filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ghost,
  .base {
    animation: none;
  }
}

/* ---------- hover: green tint + star ---------- */

/* glow goes on the wrapper, because .base already has a filter animation */
.layer {
  transition: filter 0.3s ease;
}
.layer:hover {
  filter: drop-shadow(0 0 1.2vw #00ff6a);
}

/* green overlay, masked by the frame image so transparency is kept */
.tint {
  position: absolute;
  inset: 0;
  background: #00ff6a;
  mix-blend-mode: color;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  -webkit-mask: var(--src) center / 100% 100% no-repeat;
  mask: var(--src) center / 100% 100% no-repeat;
}
.layer:hover .tint {
  opacity: 0.85;
}

.star {
  position: absolute;
  z-index: 3; /* above the main png. Use 1 to put it behind like the frames */
  height: auto;
  pointer-events: none; /* never steals hover from the frame */
  opacity: 0;

  transition:
    opacity 0.25s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 0 0.8vw #00ff6a);
}
.star.on {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  animation: twinkle 1.2s ease-in-out 0.45s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .star {
    transition: opacity 0.2s;
    transform: none;
  }
  .star.on {
    animation: none;
  }
}
</style>
