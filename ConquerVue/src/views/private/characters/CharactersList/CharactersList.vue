<template>
  <ul>
    <li v-for="character in characters" :key="character.id">
      <CharactersDetail :character="character" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { type Character } from '../../../../model/characterModel'
import CharactersDetail from './CharacterDetail/CharactersDetail.vue'

defineProps<{
  characters: Character[]
}>()
</script>
