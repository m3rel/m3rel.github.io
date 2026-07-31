<!--route /writing/:slug, laat posts content zien, soort post loader-->
<script setup>
  import { ref, watchEffect } from "vue"
  import { useRoute } from "vue-router"

  const route = useRoute()
  const PostComponent = ref(null)

  //set post component to the one that matches the post
  watchEffect(async () => {
    PostComponent.value = (await import(`../content/writing/${route.params.slug}.vue`)).default
  })

</script>

<template>
  <RouterLink to="/writing" class="back-link">← back</RouterLink>
  <component :is="PostComponent" v-if="PostComponent" />
</template>

<style scoped>

</style>