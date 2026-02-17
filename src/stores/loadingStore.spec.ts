import { createPinia, setActivePinia } from 'pinia'
import { useLoadingStore} from '@/stores/loadingStore.ts'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Loading Store', () => {

  let loadingStore: ReturnType<typeof useLoadingStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    loadingStore = useLoadingStore()
  })

  it('tests loading store holds isLoading with a default of false', () => {
    expect(loadingStore.isLoading).toBe(false)
  })
})
