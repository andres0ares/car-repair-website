// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    cars: {
      data: [],
      status: "none", // 'none', waiting', 'ready', 'error'
    },
    servicos: {
      data: [],
      status: "none", // 'none', waiting', 'ready', 'error'
    },
    pagamentos: {
      data: [],
      status: "none", // 'none', waiting', 'ready', 'error'
    },
  }),
  getters: {
    getCars: (state) => state.cars,
    getPagamentos: (state) => state.pagamentos,
    getServicos: (state) => state.servicos,
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
    setPagamentos(data, status) {
      this.pagamentos = { data, status }
    },
    resetPagamentos() {
      this.pagamentos = {
        data: [],
        status: "waiting",
      };
    },
    setServicos(data, status) {
      this.servicos = { data, status }
    },
    resetServicos() {
      this.servicos = {
        data: [],
        status: "waiting",
      };
    },
  },
  persist: {
    storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
  },
})
