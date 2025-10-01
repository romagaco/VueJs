<template>
  <form @submit.prevent="handleRegister">
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

    <InputElement
      v-model="formData.confirmPassword.value"
      type="password"
      placeHolder="confirmPassword"
      :error="formData.confirmPassword.error"
      required
    />
    <button type="submit">Register</button>
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

  confirmPassword: {
    value: '',
    error: '',
  },
})

const registerSchema = z.object({
  email: z.string().email({ message: 'invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long ' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long ' }),
}).refine( data => data.password === data.confirmPassword , {
  message: "passwrod dont match",
  path: ["confirmPassword"]
})


const router = useRouter()

const handleRegister = async () => {
  Object.keys(formData.value).forEach((key) =>
formData.value[key as keyof typeof formData.value].error= ""
)
  const result = registerSchema.safeParse({
    email: formData.value.email.value,
    password: formData.value.password.value,
    confirmPassword: formData.value.confirmPassword.value,
  })
  if (!result.success) {
    result.error.errors.forEach((e) => {
      const field = e.path[0] as keyof typeof formData.value

      if (formData.value[field]) {
        formData.value[field].error = e.message
      }
     })
  })

  router.push("/login")
}
</script>

<style lang="sass" module></style>
