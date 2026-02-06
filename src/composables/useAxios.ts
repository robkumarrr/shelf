import axios from 'axios';
import { ref } from 'vue';
import { useLoadingStore } from '@/stores/loadingStore.ts'
import { storeToRefs } from 'pinia'

export function useAxios() {
  const loadingStore = useLoadingStore();
  const { isLoading } = storeToRefs(loadingStore);

  async function get(endpoint: string): Promise<object> {
    const response: Promise<object> = axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
    return { get }
  }
}
