// Utilities
import { defineStore } from 'pinia'

export const useViewStore = defineStore('views', {
  state: () => ({
    viewUserType: 'client',
  }),
  getters: {
    //_isAdmin: (state) => state.isAdmin,
  },
  actions: {
    setViewUserType(value) {
      this.viewUserType = value // 'client', 'staff', 'admin'
    },
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
