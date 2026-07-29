<script setup>

const props = defineProps({
  text: { type: String, default: 'hello' },
  slug: { type: String, required: true }
})

</script>

<template>
<!--  todo: de href werkt niet (neemt de {{}} mee)-->
  <div class="box">
    <router-link :to="`/${slug}`">{{ text }}</router-link>
  </div>
</template>

<style scoped>

.box {
  border: 1px #000000 dashed;
  border-radius: 10px;
  padding: 20px;
  font-size: 150%;
}

</style>