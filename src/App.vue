<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

async function getCompactDisc() {
  const response = await axios.get('http://localhost/api/v1/compact-disc', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_LARAVEL_API_TOKEN}`,
    },
  })
}

onMounted(() => {
  getCompactDisc()
})
</script>

<template>
  <h1>You did it!</h1>
</template>

<style scoped></style>
