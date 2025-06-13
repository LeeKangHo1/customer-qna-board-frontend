import { defineStore } from 'pinia'
import axios from '../api/axios' // axios 인스턴스

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null,
  }),

  actions: {
    async login({ loginId, password }) {
      try {
        const res = await axios.post('/login', {
          login_id: loginId,
          password: password
        })

        const token = res.data.token
        const user = res.data.user // ← 사용자 정보 함께 받음

        localStorage.setItem('token', token)
        this.isLoggedIn = true

        // 사용자 정보 요청
        const userRes = await axios.get(`/users/${user.id}`)
        this.userInfo = userRes.data.response

        return true
      } catch (err) {
        return false
      }
    },

    logout() {
      this.isLoggedIn = false
      this.userInfo = null
      localStorage.removeItem('token')
      
    },
  },
})
