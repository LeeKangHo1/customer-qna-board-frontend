// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null, // { id, loginId, name, email, isAdmin } 등 저장
  }),

  actions: {
    login({ loginId, password }) {
      if (loginId === 'sa' && password === 'sa') {
        this.isLoggedIn = true
        this.userInfo = {
          id: 1,
          loginId: 'sa',
          name: '관리자',
          email: 'admin@example.com',
          isAdmin: true,
        }
        return true
      } else {
        return false
      }
    },

    logout() {
      this.isLoggedIn = false
      this.userInfo = null
    },
  },
})
