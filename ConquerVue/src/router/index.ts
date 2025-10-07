import { useAuthStore } from '@/stores/useAuthStore'
import { useCharacterStore } from '@/stores/useCharacterStore'
import LoginPage from '@/views/Login/LoginPage.vue'
import CharacterForm from '@/views/Private/Characters/CharacterForm.vue'
import CharactersPage from '@/views/Private/Characters/CharactersPage.vue'
import RegisterPage from '@/views/Register/RegisterPage.vue'

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name:"login"}},
    { path: "/login", name: "Login", component: LoginPage},
    { path: "/register", name: "Register", component: RegisterPage},
    { path: "/characters", name: "CharactersContainer", component: CharactersPage},
    { path: "/characters/new", name: "NewCharacter", component: CharacterForm},
    { path: "/characters/edit/:id", name: "EditCharacter", component: CharacterForm},
  ],
})

router.beforeEach(async (toString, _form, next) => {
  const publiPages = ["Login", "Register"]
  const authRequired = !publiPages.includes(toString.name as string)
  const authStore = useAuthStore()
  const token = authStore?.token

  if (authRequired) {
    const characterStore = useCharacterStore()
    characterStore.init()

    if (!token) {
      return next({ name: "Login"})
    }
  }

  next()
})

export default router
