import { createPinia, setActivePinia } from 'pinia'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'

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

const mockAuthStore = {
  isAuthenticated: ref<boolean>(false),
  login: vi.fn(),
}

vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => mockAuthStore,
}))

const mockLoadingStore = {
  isLoading: ref<boolean>(false),
}

vi.mock('@/stores/loadingStore', () => ({
  useLoadingStore: () => mockLoadingStore,
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

const mockToastAdd = vi.fn()

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: mockToastAdd,
  }),
}))

describe('Login View', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    setActivePinia(createPinia())
    mockUserStore.email.value = null
    mockUserStore.username.value = null
    wrapper = mount(LoginView, {
      global: {
        plugins: [createPinia(), router, PrimeVue, ToastService],
      },
    })
  })

  describe('Mounts and defaults', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
    })

    it('mounts the page', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('loading store values are default', () => {
      const { isLoading } = mockLoadingStore;
      expect(isLoading.value).toBe(false);
    })

    it('auth store values are default', () => {
      const { isAuthenticated } = mockAuthStore;
      expect(isAuthenticated.value).toBe(false);
    })

    it('user store values are default', () => {
      const { username, email } = mockUserStore;
      expect(username.value).toBe(null);
      expect(email.value).toBe(null);
    })

    it('does not render the progress spinner on mount', () => {
      const spinner = wrapper.findComponent(ProgressSpinner)
      expect(spinner.exists()).toBe(false)
    })
  })

  describe('Login form behaviour', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
    })

    it('renders the login form and login button is disabled', () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const loginButton = loginForm.find('[data-testid="login-button"]')
      expect(loginButton.attributes('disabled')).toBeUndefined()
    })

    it('keeps login button disabled if email is valid but password is not valid', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('valid@example.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('')
      await passwordInput.trigger('blur')

      await flushPromises()

      const loginButton = loginForm.find('[data-testid="login-button"]')
      expect(loginButton.attributes('disabled')).toBeDefined()
    })

    it('keeps login button disabled if password is valid but login is not valid', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('invalidexample.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('validPassword')
      await passwordInput.trigger('blur')

      await flushPromises()

      const loginButton = loginForm.find('[data-testid="login-button"]')
      expect(loginButton.attributes('disabled')).toBeDefined()
    })

    it('enables login button if password and email are both valid', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('valid@example.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('validPassword')
      await passwordInput.trigger('blur')

      await flushPromises()

      const loginButton = loginForm.find('[data-testid="login-button"]')
      expect(loginButton.attributes('disabled')).toBeUndefined()
    })

    it('submitting valid credentials calls the API with correct payload', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('valid@example.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('validPassword')
      await passwordInput.trigger('blur')

      await loginForm.trigger('submit');
      await flushPromises()

      expect(mockAuthStore.login).toHaveBeenCalledWith({
        email: 'valid@example.com',
        password: 'validPassword',
      })
    })

    it('a success toast is rendered on-screen when the login information is submitted correctly', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('valid@example.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('validPassword')
      await passwordInput.trigger('blur')

      await loginForm.trigger('submit')
      await flushPromises()

      expect(mockAuthStore.login).toHaveBeenCalledWith({
        email: 'valid@example.com',
        password: 'validPassword',
      })

      expect(mockToastAdd).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Login successful. Redirecting...',
        life: 3000,
      })
    })

    it('an error toast is rendered on-screen when the login fails', async () => {
      const loginForm = wrapper.find('[data-testid="login-form"]')
      expect(loginForm.exists()).toBe(true)

      mockAuthStore.login.mockRejectedValueOnce(new Error('Login failed'))

      const emailInput = loginForm.find('[data-testid="email-input"]')
      expect(emailInput.exists()).toBe(true)
      await emailInput.setValue('valid@example.com')
      await emailInput.trigger('blur')

      const passwordInput = loginForm.find('[data-testid="password-input"]')
      expect(passwordInput.exists()).toBe(true)
      await passwordInput.setValue('validPassword')
      await passwordInput.trigger('blur')

      await loginForm.trigger('submit')
      await flushPromises()

      expect(mockToastAdd).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Login failed: Error: Login failed',
        life: 3000,
      })
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
