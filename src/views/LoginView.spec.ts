import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore.ts'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ref } from 'vue'

const mockUserStore = {
  username: ref<string | null>(null),
  email: ref<string | null>(null),
}

vi.mock('@/stores/userStore', () => ({
  useUserStore: () => mockUserStore,
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

describe('Login View', () => {
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    mockUserStore.email.value = null
    mockUserStore.username.value = null
    authStore = useAuthStore()
  })

  describe('Mounts', () => {

    it('mounts the page', () => {

    })

  })
})

