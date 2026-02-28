import { type AxiosResponse } from 'axios'
import { useLoadingStore } from '@/stores/loadingStore.ts'
import { storeToRefs } from 'pinia'
import axiosInstance from '@/lib/axiosConfig.ts'

export function useAxios() {
  const loadingStore = useLoadingStore()
  const { isLoading } = storeToRefs(loadingStore)

  async function get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      isLoading.value = true
      return await axiosInstance.get(endpoint)

    } catch (error: unknown) {
      console.error(error)
      throw error

    } finally {
      isLoading.value = false
    }
  }

  async function post<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      isLoading.value = true
      return await axiosInstance.post(
        endpoint,
        data,
      )
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function patch<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      isLoading.value = true
      return await axiosInstance.patch(endpoint, data)
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function put<T>(endpoint: string, data: object): Promise<AxiosResponse<T>> {
    try {
      isLoading.value = true
      return await axiosInstance.put(endpoint, data)
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function destroy<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      isLoading.value = true
      return await axiosInstance.delete(endpoint)
    } catch (error: unknown) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return { get, post, patch, put, destroy }
}
