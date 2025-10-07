import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { mockCharacters } from './mocks/charactersMock'
import { Character } from '../model/characterModel'

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const mock = new MockAdapter(apiClient)

mock.onPost('/register').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  if (email && password) {
    const token = 'mocked_token'
    return [200, { token }]
  } else {
    return [400, { message: 'Invalid email or password' }]
  }
})

mock.onPost('/login').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  if (email === 'test@tets.com' && password === 'testtest') {
    const token = 'mocked_token'
    return [200, { token }]
  } else {
    return [400, { message: 'Invalid email or password' }]
  }
})

/* mock.onGet("/characters").reply(200, mockCharacters)  forma simple*/

/* forma larga, para usar console logs */
mock.onGet('/characters').reply((config) => {
  return [200, mockCharacters]
})

mock.onPost('/characters').reply((config) => {
  const characterData: Character = JSON.parse(config.data)

  mockCharacters.push(characterData)

  return [200, mockCharacters]
})

mock.onPut(/\/characters\/\d+/).reply((config) => {
  const id = parseInt(config.url!.split('/').pop()!)
  const characterData: Character = JSON.parse(config.data)
  const index = mockCharacters.findIndex((character) => character.id === id)

  if (index === -1) {
    return [404, { message: 'character not found' }]
  }

  mockCharacters[id] = characterData

  return [200, characterData]
})

mock.onDelete(/\/characters\/\d+/).reply((config) => {
  const id = paseInt(config.url!.split('/').pop()!)
  const index = mockCharacters.findIndex((character) => character.id === id)
  const foundCharacter = mockCharacters[id]

  if (!foundCharacter) {
    return [404, { message: ' Character not found' }]
  }
  mockCharacters.splice(index, 1)
  return [200, { data: id }]
})

export default apiClient
