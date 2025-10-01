<template>
  <form @submit.prevent="handleLogin">
    <InputElement
      v-model="formData.email.value"
      type="email"
      placeHolder="Email"
      :error="formData.email.error"
      required
    />

    <InputElement
      v-model="formData.password.value"
      type="password"
      placeHolder="password"
      :error="formData.password.error"
      required
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputElement from '../../components/inputElement.vue'
import { z } from 'zod'
import { forEachChild } from 'typescript'

const formData = ref({
  email: {
    value: '',
    error: '',
  },

  password: {
    value: '',
    error: '',
  },
})

const loginSchema = z.object({
  email: z.string().email({ message: 'invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long ' }),
})

const router = useRouter()

const handleLogin = async () => {
  Object.keys(formData.value).forEach((key) =>
formData.value[key as keyof typeof formData.value].error= ""
)
  const result = loginSchema.safeParse({
    email: formData.value.email.value,
    password: formData.value.password.value,
  })
  if (!result.success) {
    result.error.errors.forEach(e) => {
      const field = e.path[0] as keyof typeof formData.value

      if (formData.value[field]) {
        formData.value[field].error = e.message
      }
     })
  }

  router.push("/characters")
}
</script>

<style lang="sass" module></style>
