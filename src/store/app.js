// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    cars: {
      data: {},
      status: "none", // 'none', waiting', 'ready', 'error'
    },
  }),
  getters: {
    getCars: (state) => state.cars,
  },
  actions: {
    setCars(data, status) {
      this.cars = { data, status }
    },
    resetCars() {
      this.cars = {
        data: [],
        status: "waiting",
      };
    },
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
