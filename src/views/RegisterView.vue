<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import { Message } from 'primevue'
import { Button } from 'primevue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { ref } from 'vue'
import { useAxios } from '@/composables/axios/useAxios.ts'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/loadingStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useAuthStore } from '@/stores/authStore.ts'
import { storeToRefs } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner'

const toast = useToast()
const { get, post } = useAxios()

const userStore = useUserStore()
const { username, email } = storeToRefs(userStore)

const loadingStore = useLoadingStore()
const { isLoading } = storeToRefs(loadingStore)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const router = useRouter()

type RegistrationData = {
  username: string
  email: string
  password: string
  password_confirmation: string
}

const initialValues = ref<RegistrationData>({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const registrationForm = z
  .object({
    name: z
      .string({ error: 'Username is required.' })
      .min(5, { message: 'Username is not long enough.' })
      .trim(),
    email: z.email({ error: 'Email is required.' }).trim(),
    password: z
      .string({ error: 'Password is required.' })
      .min(8, { message: 'Password is not long enough.' }),
    password_confirmation: z.string({ error: 'Password confirmation is required.' }),
  })
  .refine((regForm) => regForm.password === regForm.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  })

const resolver = ref(zodResolver(registrationForm))

async function onFormSubmit({ values }: FormSubmitEvent) {
  console.log('Form submitted')
  // const { password_confirmation: _, ...registrationData } = values as RegistrationData
  try {
    isLoading.value = true

    toast.add({ severity: 'success', summary: 'Registering...', life: 3000 })
    // await get('/sanctum/csrf-cookie')
    // const response: AxiosResponse = await post('/api/register', registrationData)
    const response = {
      status: 201,
      data: {
        attributes: {
          name: 'robTest',
          email: 'test@email.com',
        },
      },
    }

    if (response.status === 201) {
      email.value = response.data?.attributes.email
      username.value = response.data?.attributes.email
      toast.add({
        severity: 'success',
        summary: `New user with email '${email.value}' successfully registered.`,
        life: 3000,
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    // isLoading.value = false
  }
  toast.add({ severity: 'success', summary: 'Registering...', life: 3000 })

  setTimeout(async () => {
    await router.push({ path: '/' })
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <section class="flex min-h-screen justify-center items-center">
    <Toast />
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      :resolver
      @submit="onFormSubmit"
      class="flex w-full bg-neutral-50 rounded-2xl drop-shadow-2xl shadow-neutral-300 max-w-lg mx-auto flex-col gap-6 p-20"
    >
      <ProgressSpinner v-if="isLoading" />
      <section v-else>
        <h1 class="font-bold text-2xl text-center">Register</h1>
        <p class="text-center">
          Already have an account? Head to the
          <router-link class="text-indigo-600" to="/login">Login</router-link>
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
      </section>
    </Form>
  </section>
</template>

<style scoped></style>
