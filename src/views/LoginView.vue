<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import InputText from 'primevue/inputtext'
import { Message } from 'primevue'
import { Button } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore.ts'
import { useAuthStore } from '@/stores/authStore.ts'
import { storeToRefs } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner'
import type { LoginData } from '@/schemas/LoginSchema.ts'
import { loginSchema } from '@/schemas/LoginSchema.ts'

const toast = useToast()

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)

const authStore = useAuthStore()
const { login } = authStore

const router = useRouter()

const initialValues: LoginData = {
  email: '',
  password: '',
}

const resolver = ref(zodResolver(loginSchema))

async function onFormSubmit({ values, valid }: FormSubmitEvent) {
  if (!valid) {
    return
  }
  toast.add({ severity: 'info', summary: 'Logging in...', life: 1500 })

  try {
    const { ...loginData } = values as LoginData
    await login(loginData)
    toast.add({
      severity: 'success',
      summary: 'Login successful. Redirecting...',
      life: 3000,
    })
    await router.push({ path: '/' })
  } catch (error) {
    toast.add({ severity: 'error', summary: `Login failed: ${error}`, life: 3000 })
  }
}
</script>

<template>
  <section class="flex min-h-screen justify-center items-center w-[90%] sm:max-w-lg mx-auto">
    <ProgressSpinner v-if="isLoading" />
    <Form
      data-testid="login-form"
      v-else
      v-slot="$form"
      :initialValues="initialValues"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      :resolver
      @submit="onFormSubmit"
      class="flex w-full bg-neutral-50 rounded-2xl drop-shadow-2xl shadow-neutral-300 max-w-lg mx-auto flex-col gap-6 p-20"
    >
      <h1 class="font-bold text-2xl text-center">Login</h1>
      <p class="text-center">
        Don't have an account? Please go to our
        <router-link class="animated-link" to="/register">Register</router-link>
        page.
      </p>
      <div class="flex flex-col gap-y-4">
        <InputText name="email" type="email" placeholder="Email" />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error?.message }}
        </Message>
        <InputText name="password" type="password" placeholder="Password" />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
        <Button
          class="w-fit mx-auto"
          type="submit"
          severity="secondary"
          :disabled="isLoading"
          label="Login"
        />
      </div>
    </Form>
  </section>
</template>
