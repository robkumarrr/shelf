import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useLoadingStore } from '@/stores/loadingStore.ts'
import { storeToRefs } from 'pinia'

export function useAxios() {
  const loadingStore = useLoadingStore()
  const { isLoading } = storeToRefs(loadingStore)

  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true

  axios.interceptors.request.use(
    function(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
      config.headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_TOKEN}`)
      return config
    }
  )

  async function get<T>(endpoint: string): Promise<T> {
    try {
      isLoading.value = true
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      })
      return response.data

    } catch (error) {
      console.error(error)
      throw error

    } finally {
      isLoading.value = false
    }
  }

  async function post(endpoint: string, data: object): Promise<object> {
    try {
      const response: Promise<object> = axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
        },
      )
      return response
    } catch (error) {
      console.error(error)
      throw error

    }
  }

  return { get, post }
}
