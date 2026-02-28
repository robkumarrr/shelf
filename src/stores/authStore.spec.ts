import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore} from '@/stores/authStore.ts'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Auth Store', () => {

  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
  })

  it('exposes isAuthenticated with a default of false', () => {
    expect(authStore.isAuthenticated).toBe(false)
  })
})
