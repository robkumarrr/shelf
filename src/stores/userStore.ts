import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref<string | null>(null)
  const email = ref<string | null>(null)

  return { username, email }
})
