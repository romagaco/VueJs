<template>
  <div>
    <h1>Personajes de mi lista</h1>
    <CharactersList :characters="characters" />
  </div>
</template>
<script lang="ts" setup>
import { useCharacterStore } from '../../../stores/useCharacterStore'
import { computed } from 'vue'
import CharactersList from './CharactersList/CharactersList.vue'

console.log("Characters")
const charactersStore = useCharacterStore()

const characters = computed(() => charactersStore.formattedCharacters)
</script>
<style lang="scss"></style>
