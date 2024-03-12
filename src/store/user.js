// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAdmin: false,
    client: {
      logged: false,
      info: [],
    }
  }),
  getters: {
    _isAdmin: (state) => state.isAdmin,
  },
  actions: {
    setIsAdmin(value) {
      this.isAdmin = value
    },
    loginClient(value) {
      this.client.logged = true;
      this.client.info = value;
    }
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
