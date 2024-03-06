// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAdmin: false,
  }),
  getters: {
    _isAdmin: (state) => state.isAdmin,
  },
  actions: {
    setIsAdmin(value) {
      this.isAdmin = value
    },
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
