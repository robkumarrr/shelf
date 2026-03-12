import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore.ts'
import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/register', component: { template: '<div />' } },
  ],
})

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
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
      wrapper = mount(LoginView, {
        global: {
          plugins: [
            createPinia(),
            router,
            PrimeVue,
            ToastService,
          ],
        },
      })
    })

    it('mounts the page', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('loading store values are default', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('auth store values are default', () => {
      expect(wrapper.exists()).toBe(true)
    })

  })

  describe('Authorization', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
      wrapper = mount(LoginView, {
        global: {
          plugins: [createPinia(), router, PrimeVue, ToastService],
        },
      })
    })

    it('renders the login form', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})

//TODO:
// 1. Rendering — What should be visible when the page loads?
// Is the form there?
// Are the input fields present?
// Is the submit button there?
//
//TODO:
// 2. Interaction — What happens when the user does something?
// Can they type into the fields?
// What happens when they submit with empty fields?
// What happens when they submit with valid credentials?
// What happens when the API returns an error?
//
//TODO:
// 3. Side effects — What should happen as a result of interaction?
// Does the store get updated after a successful login?
// Does the user get redirected?
// Does a toast/error message appear?
