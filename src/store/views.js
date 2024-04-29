// Utilities
import { defineStore } from 'pinia'

export const useViewStore = defineStore('views', {
  state: () => ({
    viewUserType: 'client',
    viewPage: ''
  }),
  getters: {
    //_isAdmin: (state) => state.isAdmin,
  },
  actions: {
    setViewUserType(value) {
      this.viewUserType = value; // 'client', 'staff', 'admin'
    },
    setViewPage(value) {
      this.viewPage = value;
    }
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
