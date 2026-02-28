import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore} from '@/stores/authStore.ts'
import { describe, expect, it, beforeEach, vi } from 'vitest'

vi.mock('@/composables/axios/useAxios', () => ({
  useAxios: () => ({
    get: vi.fn().mockResolvedValue({ data: null }), // fake CSRF call
    post: vi.fn().mockResolvedValue({
      status: 201,
      data: {
        attributes: {
          name: 'testuser',
          email: 'test@example.com',
        },
      },
    }),
  }),
}))

describe('Auth Store', () => {

  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
  })

  it('exposes isAuthenticated with a default of false', () => {
    expect(authStore.isAuthenticated).toBe(false)
  })

  describe('Register', () => {
    it('Succesfully registers a user', () => {

    })
  })
})
