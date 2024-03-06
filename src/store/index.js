// Utilities
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { markRaw } from 'vue';
import  router  from '@/router/index';

const pinia = createPinia()
pinia.use(({ store }) => { store.router = markRaw(router) });
pinia.use(piniaPluginPersistedState)

export default pinia