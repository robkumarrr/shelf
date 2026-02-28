import { createPinia, setActivePinia } from 'pinia'
import { useUserStore} from '@/stores/userStore.ts'
import { describe, expect, it, beforeEach } from 'vitest'

describe('User Store', () => {

  let userStore: ReturnType<typeof useUserStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    userStore = useUserStore()
  })

  it('exposes username with a default value of null', () => {
    expect(userStore.username).toBe(null)
  })

  it('exposes email with a default value of null', () => {
    expect(userStore.email).toBe(null)
  })
})
