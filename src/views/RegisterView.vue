<script setup lang="ts">
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import { Button } from 'primevue'
function onFormSubmit() {

}
</script>

<template>
  <h1>Register</h1>

  <Form
    @submit="onFormSubmit"
    class="flex justify-center flex-col gap-4"
  >
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" />
    </div>
    <div class="flex flex-col gap-1">
      <InputText name="email" type="text" placeholder="Email" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </Form>
</template>

<style scoped></style>
