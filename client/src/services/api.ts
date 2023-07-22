import { AppError } from '@/utils/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))

  } else {
    return Promise.reject(new AppError("Erro no servidor. Tente novamente mais tarde."))
  }
})

export { api }