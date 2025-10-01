import axios from 'axios'

export const login = (email: string, password: string) => {
  return axios.post('/login', {
    email,
    password,
  })
}

export const register = (email: string, password: string) => {
  return axios.post('/register', {
    email,
    password,
  })
}
