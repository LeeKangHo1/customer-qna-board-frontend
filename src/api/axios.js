// src/api/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Flask 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
