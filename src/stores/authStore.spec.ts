import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore} from '@/stores/authStore.ts'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ref } from 'vue'

const mockUserStore = {
  username: ref<string | null>(null),
  email: ref<string | null>(null),
}

vi.mock('@/stores/userStore', () => ({
  useUserStore: () => mockUserStore
}))

const mockPost = vi.fn().mockResolvedValue({
  status: 201,
  data: {
    data: {
      attributes: {
        name: 'testuser',
        email: 'test@example.com',
      },
    },
  },
})

const mockGet = vi.fn().mockResolvedValue({ data: null })

vi.mock('@/composables/axios/useAxios', () => ({
  useAxios: () => ({
    get: mockGet,
    post: mockPost,
  }),
}))

describe('Auth Store', () => {

  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    mockUserStore.email.value = null
    mockUserStore.username.value = null
    authStore = useAuthStore()
  })

  it('exposes isAuthenticated with a default of false', () => {
    expect(authStore.isAuthenticated).toBe(false)
  })

  describe('Register', () => {
    it('register method makes call to register endpoint', async () => {
      expect(mockUserStore.email.value).toBe(null)
      expect(mockUserStore.username.value).toBe(null)
      expect(authStore.isAuthenticated).toBe(false)

      await authStore.register({
        name: 'testuser',
        email: 'test@example.com',
        password: 'password',
      })

      expect(mockGet).toBeCalledWith('/sanctum/csrf-cookie')
      expect(mockGet).toHaveBeenCalledBefore(mockPost)

      expect(authStore.isAuthenticated).toBe(true)
      expect(mockUserStore.email.value).toBe('test@example.com')
      expect(mockUserStore.username.value).toBe('testuser')
    })

    it('register method catches error', async () => {
      mockPost.mockRejectedValueOnce(new Error('Server error'))
      expect(authStore.isAuthenticated).toBe(false)

      await expect(authStore.register({
        name: 'testuser',
        email: 'test@example.com',
        password: 'password',
      })).rejects.toThrow()

      expect(mockGet).toBeCalledWith('/sanctum/csrf-cookie')
      expect(mockGet).toHaveBeenCalledBefore(mockPost)

      expect(authStore.isAuthenticated).toBe(false)
      expect(mockUserStore.email.value).toBe(null)
      expect(mockUserStore.username.value).toBe(null)
    })
  })
})
