import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useAxios } from '@/composables/axios/useAxios.ts'
import { useUserStore } from '@/stores/userStore.ts'
import type { RegisterPayload } from '@/schemas/RegistrationSchema.ts'
import type { AxiosResponse } from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const { get, post } = useAxios()

  const userStore = useUserStore()
  const { username, email } = storeToRefs(userStore)

  const isAuthenticated = ref<boolean>(false)

  async function register(registerPayload: RegisterPayload): Promise<void> {
    try {
      await get('/sanctum/csrf-cookie')
      const response: AxiosResponse = await post('/api/register', registerPayload)

      email.value = response.data?.attributes.email
      username.value = response.data?.attributes.name
      isAuthenticated.value = true

    } catch (error) {
      console.error(error)
      throw new Error(`${error}`)
    }
  }

  return { isAuthenticated, register }
})
