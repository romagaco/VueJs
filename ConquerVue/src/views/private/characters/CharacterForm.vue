<template>
  <form @submit="handleSubmit">
    <InputElement
      v-model="formData.name.value"
      type="text"
      place-holder="Name"
      :error="formData.name.error"
      required
    />
    <InputElement
      v-model="formData.name.value"
      type="text"
      place-holder="Last Name"
      :error="formData.name.error"
      required
    />

    <button type="submit">{{  isEdit? "Edit" : "Save " }} Character</button>
  </form>
</template>

<script lang="ts" setup>

import InputElement from '../../../components/InputElement.vue'
import apiClient from '../../..//interceptors/axios'
import type { Character } from '../../..//model/characterModel'
import { useCharacterStore } from '../../..//stores/useCharacterStore'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

const route = useRoute()
const router = useRouter)
const isEdit = computed(() => !!route.params.id)
const useCharacterStore = useCharacterStore()

const CharacterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, {message: "Last Name is required"}),
})

const formData = ref({
  name: { value: "", error: ""},
  lastName: { value: "", error: ""},
})

if (isEdit.value) {
  const id = Number(route.params.id)
  const Character = characterStore.getCharacter(id)

  if (Character) {
    formData.value = {
      name: { value: Character.name, error: "" },
      lastName: { value: Character.lastName, error: "" },
    }
  }
}

const handleSubmit = async () => {
  try {
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof typeof formData.value].error = ""
    })

    const result = CharacterSchema.safeParse({
      name: formData.value.name.value,
      lastname: formData.value.lastName.value
    })

    if (!result.success) {
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof typeof formData.value
        if (formData.value[field]) {
          formData.value[field].error = e.message
        }
      })
      return
    }

    const formDatapayload = Object.fromEntries(
      Object.entries(formData.value).map(([keyof, {value}]) => [keyof, value]),
    ) as unknown as Omit<Character, "id">

    if (isEdit.value) {
      const formDatapayloadWithId = { ...formDatapayload, id: Number(route.params.id) }
    } else {
      useCharacterStore.editCharacter(formDatapayloadWithId)
    } else {
      useCharacterStore.addCharacter(formDatapayload)
    }

    router.push("/characters")
  } catch (err: unknown) {
    console.error("Error al guardar personaje", err)
  }
}
</script>
<style module lang="scss"></style>
