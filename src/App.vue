<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAxios } from '@/composables/useAxios.ts'

type ApiResource = {
  data: object[]
  links: object
  meta: object
}

const { get } = useAxios()
const data = ref<object[]>([])

async function fetchData() {
  const response = await get<ApiResource>('api/v1/compact-disc')
  data.value = response
  console.log(data)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <h1>You did it!</h1>
  <section>
    <table>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Title</th>
          <th>Number of Songs</th>
          <th>Released On</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data" :key="item.id">
          <td>{{ item.attributes.artist }}</td>
          <td>{{ item.attributes.album_name }}</td>
          <td>{{ item.attributes.number_of_songs }}</td>
          <td>{{ new Date(item.attributes.released_on)}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
