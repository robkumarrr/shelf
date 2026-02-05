<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

async function getCompactDisc() {
  const response = await axios.get('http://localhost/api/v1/compact-disc', {
    headers: {
      Authorization: 'Bearer 1|VDPl73Hqcfs8GUfL0q7SyTzmpIelxIzP2iroNsKD7ee59d30',
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
