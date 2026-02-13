import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
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
      const response: AxiosResponse<T> = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`)
      return response.data

    } catch (error: unknown) {
      console.error(error)
      throw error

    } finally {
      isLoading.value = false
    }
  }

  async function post<T>(endpoint: string, data: object): Promise<T> {
    try {
      isLoading.value = true
      const response: AxiosResponse<T> = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        data,
      )
      return response.data
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function patch<T>(endpoint: string, data: object): Promise<T> {
    try {
      isLoading.value = true
      const response: AxiosResponse<T> = await axios.patch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        data,
      )
      return response.data
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function put<T>(endpoint: string, data: object): Promise<T> {
    try {
      isLoading.value = true
      const response: AxiosResponse<T> = await axios.put(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        data,
      )
      return response.data
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function destroy<T>(endpoint: string): Promise<T> {
    try {
      isLoading.value = true
      const response: AxiosResponse<T> = await axios.delete(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
      )
      return response.data
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return { get, post, patch, put, destroy }
}
