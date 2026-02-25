<script setup lang="ts">
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import { Button } from 'primevue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const toast = useToast()
//
function onFormSubmit() {
  console.log('Form submitted')
  toast.add({ severity: 'success', summary: 'Registering...', life: 3000 })
}
</script>

<template>
  <section class="flex min-h-screen justify-center items-center">
    <Toast />
    <Form
      @submit="onFormSubmit"
      class="flex w-full bg-neutral-50 rounded-2xl drop-shadow-2xl shadow-neutral-300 max-w-lg mx-auto flex-col gap-6 p-20"
    >
      <h1 class="font-bold text-2xl text-center">Register</h1>
      <p class="text-center">
        Already have an account? Head to the <router-link to="/login">Login</router-link> page.
      </p>
      <div class="flex flex-col gap-y-4">
        <InputText name="username" type="text" placeholder="Username" />
        <InputText name="email" type="email" placeholder="Email" />
        <InputText name="password" type="password" placeholder="Password" />
        <InputText
          name="password_confirmation"
          type="password"
          placeholder="Password Confirmation"
        />
        <Button class="w-fit mx-auto" type="submit" severity="secondary" label="Register" />
      </div>
    </Form>
  </section>
</template>

<style scoped></style>
