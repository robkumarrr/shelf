import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useAxios } from '@/composables/axios/useAxios.ts'
import { createPinia, setActivePinia } from 'pinia'
import axiosInstance from '@/lib/axiosConfig.ts'
import { useLoadingStore } from '@/stores/loadingStore.ts'

vi.mock('@/lib/axiosConfig.ts')

describe('useAxios composable', () => {
  let loadingStore: ReturnType<typeof useLoadingStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    loadingStore = useLoadingStore()
    loadingStore.isLoading = false
    vi.clearAllMocks()
  })

  describe('get', () => {
    it('tests axios get returns data when called', async () => {
      expect(loadingStore.isLoading).toBe(false)

      const mockData = { id: 1, data: {} }
      vi.mocked(axiosInstance.get).mockImplementation(async () => {
        expect(loadingStore.isLoading).toBe(true)
        return { data: mockData }
      })

      const { get } = useAxios()
      const result = await get('/test/endpoint')

      expect(result).toEqual(mockData)
      expect(axiosInstance.get).toHaveBeenCalledExactlyOnceWith('/test/endpoint')
      expect(loadingStore.isLoading).toBe(false)
    })

    it('tests axios get handles errors from the request', async () => {
      expect(loadingStore.isLoading).toBe(false)

      vi.mocked(axiosInstance.get).mockRejectedValueOnce('Get Error')

      const { get } = useAxios()
      await expect(get('/test/endpoint')).rejects.toThrow('Get Error')

      expect(axiosInstance.get).toHaveBeenCalledExactlyOnceWith('/test/endpoint')
      expect(loadingStore.isLoading).toBe(false)
    })
  })

  describe('post', () => {
    it('tests axios post returns success when called', async () => {
      expect(loadingStore.isLoading).toBe(false)

      const mockData = { id: 1, data: {} }
      vi.mocked(axiosInstance.post).mockImplementation(async () => {
        expect(loadingStore.isLoading).toBe(true)
        return { data: mockData }
      })

      const requestData = { fake: 'data' }
      const { post } = useAxios()
      const result = await post('/test/post/endpoint', requestData)

      expect(result).toEqual(mockData)
      expect(axiosInstance.post).toHaveBeenCalledExactlyOnceWith('/test/post/endpoint', requestData)
      expect(loadingStore.isLoading).toBe(false)
    })

    it('tests axios post handles errors from the request', async () => {
      expect(loadingStore.isLoading).toBe(false)

      vi.mocked(axiosInstance.post).mockRejectedValueOnce('Post Error')

      const requestData = { fake: 'data' }
      const { post } = useAxios()
      await expect(post('/test/post/endpoint', requestData)).rejects.toThrow('Post Error')

      expect(axiosInstance.post).toHaveBeenCalledExactlyOnceWith('/test/post/endpoint', requestData)
      expect(loadingStore.isLoading).toBe(false)
    })
  })

  describe('patch', () => {
    it('tests axios patch returns success when called', async () => {
      expect(loadingStore.isLoading).toBe(false)

      const mockData = { id: 1, data: {} }
      vi.mocked(axiosInstance.patch).mockImplementation(async () => {
        expect(loadingStore.isLoading).toBe(true)
        return { data: mockData }
      })

      const requestData = { fake: 'data' }
      const { patch } = useAxios()
      const result = await patch('/test/patch/endpoint', requestData)

      expect(result).toEqual(mockData)
      expect(axiosInstance.patch).toHaveBeenCalledExactlyOnceWith('/test/patch/endpoint', requestData)
      expect(loadingStore.isLoading).toBe(false)
    })

    it('tests axios patch handles errors from the request', async () => {
      expect(loadingStore.isLoading).toBe(false)

      vi.mocked(axiosInstance.patch).mockRejectedValueOnce('Patch Error')

      const requestData = { fake: 'data' }
      const { patch } = useAxios()
      await expect(patch('/test/patch/endpoint', requestData)).rejects.toThrow('Patch Error')

      expect(axiosInstance.patch).toHaveBeenCalledExactlyOnceWith('/test/patch/endpoint', requestData)
      expect(loadingStore.isLoading).toBe(false)
    })
  })

  describe('put', () => {
    it('tests axios put returns success when called', async () => {
      expect(loadingStore.isLoading).toBe(false)

      const mockData = { id: 1, data: {} }
      vi.mocked(axiosInstance.put).mockImplementation(async () => {
        expect(loadingStore.isLoading).toBe(true)
        return { data: mockData }
      })

      const requestData = { fake: 'data' }
      const { put } = useAxios()
      const result = await put('/test/put/endpoint', requestData)

      expect(result).toEqual(mockData)
      expect(axiosInstance.put).toHaveBeenCalledExactlyOnceWith(
        '/test/put/endpoint',
        requestData,
      )
      expect(loadingStore.isLoading).toBe(false)
    })

    it('tests axios put handles errors from the request', async () => {
      expect(loadingStore.isLoading).toBe(false)

      vi.mocked(axiosInstance.put).mockRejectedValueOnce('Put Error')

      const requestData = { fake: 'data' }
      const { put } = useAxios()
      await expect(put('/test/put/endpoint', requestData)).rejects.toThrow('Put Error')

      expect(axiosInstance.put).toHaveBeenCalledExactlyOnceWith(
        '/test/put/endpoint',
        requestData,
      )
      expect(loadingStore.isLoading).toBe(false)
    })
  })

  describe('delete', () => {
    it('tests axios delete returns success when called', async () => {
      expect(loadingStore.isLoading).toBe(false)

      const mockData = { id: 1, data: {} }
      vi.mocked(axiosInstance.delete).mockImplementation(async () => {
        expect(loadingStore.isLoading).toBe(true)
        return { data: mockData }
      })

      const { destroy } = useAxios()
      const result = await destroy('/test/delete/endpoint')

      expect(result).toEqual(mockData)
      expect(axiosInstance.delete).toHaveBeenCalledExactlyOnceWith(
        '/test/delete/endpoint'
      )
      expect(loadingStore.isLoading).toBe(false)
    })

    it('tests axios delete handles errors from the request', async () => {
      expect(loadingStore.isLoading).toBe(false)

      vi.mocked(axiosInstance.delete).mockRejectedValueOnce('Delete Error')

      const { destroy } = useAxios()
      await expect(destroy('/test/delete/endpoint')).rejects.toThrow('Delete Error')

      expect(axiosInstance.delete).toHaveBeenCalledExactlyOnceWith(
        '/test/delete/endpoint',
      )
      expect(loadingStore.isLoading).toBe(false)
    })
  })
})
