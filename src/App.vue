<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAxios } from '@/composables/axios/useAxios.ts'

type ApiResource = {
  data: ApiData[]
  links: object
  meta: object
}

type ApiData = {
  type: string
  id: number
  attributes: CompactDisc
}

type CompactDisc = {
  id: number
  artist: string
  album_name: string
  number_of_songs: number
  released_on: Date
  created_at: Date
  updated_at: Date
}

const { get } = useAxios()
const data = ref<ApiData[]>([])

async function fetchData() {
  const response = await get<ApiResource>('api/v1/compact-disc')
  data.value = response.data
  console.log(data.value)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <h1>You did it!</h1>
  <router-link to="/">Home</router-link>
  <router-link to="/login">Login</router-link>
  <router-link to="/register">Register</router-link>
  <router-view />
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
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.attributes.artist }}</td>
          <td>{{ item.attributes.album_name }}</td>
          <td>{{ item.attributes.number_of_songs }}</td>
          <td>{{ new Date(item.attributes.released_on).toISOString().substring(0, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
