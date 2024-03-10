<template>
  <div class="main-login-admin">
    <div class="mt-n16">
      <DisplayLogo />
      <p class="mt-4">Digite a senha:</p>
      <v-text-field
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="password"
        :variant="'outlined'"
        :density="'compact'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      ></v-text-field>
      <v-alert v-if="err" class="mb-4" :density="'compact'" :type="'warning'" :text="'Senha inválida!'"></v-alert>
      <v-btn @click="enter" color="black">entrar</v-btn>
    </div>
  </div>
</template>

<script setup>
import DisplayLogo from "./DisplayLogo.vue";
import { useUserStore } from "@/store/user";
import { ref } from "vue";

const password = ref("");
const show = ref(false);
const user = useUserStore();
const err = ref(false);

function handleError() {
  err.value = true;
  setTimeout(() => {
    err.value = false;
  }, 4000)
}
function enter() {
  const admin_key = import.meta.env.VITE_PASSWORD_ADMIN;
  if(password.value == admin_key) user.setIsAdmin(true);
  else handleError();
}
</script>

<style>
.main-login-admin {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 1920px;
}

.clear {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.as {
  max-height: 80px;
}
</style>
