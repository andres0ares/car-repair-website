<template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="black"  
          size="small"
          text="Entrar"
          rounded
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card v-if="createClient" class="main-login-admin">
        <CreateClient @close="closeCreateClient" />
      </v-card>
      <v-card v-else>
        <div class="main-login-admin">
            <div class="mt-n16">
            <DisplayLogo />
            <p class="mt-4">Digite seu e-mail:</p>
            <v-text-field
                v-model="login.email"
                :variant="'outlined'"
                :density="'compact'"
            ></v-text-field>
            <p class="mt-n3">Digite a senha:</p>
            <v-text-field
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="login.password"
                :variant="'outlined'"
                :density="'compact'"
                :type="show ? 'text' : 'password'"
                @click:append-inner="show = !show"
            ></v-text-field>
            <v-alert v-if="err" class="mb-4" :density="'compact'" :type="'warning'" :text="'Senha inválida!'"></v-alert>
            <v-btn @click="enter" color="black" :loading="loading" :disabled="loading">entrar</v-btn>
            <v-btn @click.stop="dialog = false" color="grey" :variant="'text'" :disabled="loading">cancelar</v-btn>
            <p v-if="props.client" @click.stop="createClient = true" class="mt-7 cursor-pointer text-body-2">Não possui uma conta? <span class="font-weight-bold">cadastre-se aqui.</span></p>
            </div>
        </div>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import DisplayLogo from "@/components/DisplayLogo.vue"
import CreateClient from '../client/CreateClient.vue';
import { loginClient } from "@/api/clients";
import { loginStaff } from '@/api/staff';
//


const err = ref(false);
const show = ref(false);
const loading = ref(false);
const login = ref({
  email: undefined,
  password: undefined,
})

const createClient = ref(false);
const dialog = ref(false);

const props = defineProps({
  client: Boolean,
  staff: Boolean, 
})

const emits = defineEmits(['close']);


function enter() {
    loading.value = true

    if(props.client) {
      loginClient(login.value).then(() => {
        dialog.value = false
      }).catch(() => {
        err.value = true;
        setTimeout(() => {
          err.value = false
        }, 3000)
      })
      .finally(() => {
        loading.value = false
      })
    } 
    else if(props.staff) {
      loginStaff(login.value).then(() => {
        emits('close');
        dialog.value = false
      }).catch(() => {
        err.value = true;
        setTimeout(() => {
          err.value = false
        }, 3000)
      })
      .finally(() => {
        loading.value = false
      })
    }
}

function closeCreateClient() {
  dialog.value = false;
  createClient.value = false
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
  margin: 0 auto;
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