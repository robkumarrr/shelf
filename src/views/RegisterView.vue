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
import type { RegistrationData } from '@/schemas/RegistrationSchema.ts'
import { registrationSchema } from '@/schemas/RegistrationSchema.ts'

const toast = useToast()

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)

const authStore = useAuthStore()
const { register } = authStore

const router = useRouter()

const initialValues: RegistrationData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const resolver = ref(zodResolver(registrationSchema))

async function onFormSubmit({ values, valid }: FormSubmitEvent) {
  if (!valid) {
    return
  }
  toast.add({ severity: 'info', summary: 'Registering...', life: 1500 })

  try {
    const { password_confirmation: _, ...registrationData } = values as RegistrationData
    await register(registrationData)
    toast.add({
      severity: 'succees',
      summary: 'Registration successful. Redirecting...',
      life: 3000,
    })
    await router.push({ path: '/' })
  } catch (error) {
    toast.add({ severity: 'error', summary: `Registration failed: ${error}`, life: 300 })
  }
}
</script>

<template>
  <section class="flex min-h-screen justify-center items-center">
    <ProgressSpinner v-if="isLoading" />
    <Form
      v-else
      v-slot="$form"
      :initialValues="initialValues"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      :resolver
      @submit="onFormSubmit"
      class="flex w-full bg-neutral-50 rounded-2xl drop-shadow-2xl shadow-neutral-300 max-w-lg mx-auto flex-col gap-6 p-20"
    >
      <h1 class="font-bold text-2xl text-center">Register</h1>
      <p class="text-center">
        Already have an account? Head to the
        <router-link class="animated-link" to="/login">Login</router-link>
        page.
      </p>
      <div class="flex flex-col gap-y-4">
        <InputText name="name" type="text" placeholder="Username" />
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">
          {{ $form.name.error?.message }}
        </Message>
        <InputText name="email" type="email" placeholder="Email" />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error?.message }}
        </Message>
        <InputText name="password" type="password" placeholder="Password" />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
        <InputText
          name="password_confirmation"
          type="password"
          placeholder="Password Confirmation"
        />
        <Message
          v-if="$form.password_confirmation?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.password_confirmation.error?.message }}
        </Message>
        <Button class="w-fit mx-auto" type="submit" severity="secondary" label="Register" />
      </div>
    </Form>
  </section>
</template>
