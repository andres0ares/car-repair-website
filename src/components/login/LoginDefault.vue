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

      <v-card>
        <div class="main-login-admin">
            <div class="mt-n16">
            <DisplayLogo />
            <p class="mt-4">Digite seu e-mail:</p>
            <v-text-field
                v-model="email"
                :variant="'outlined'"
                :density="'compact'"
            ></v-text-field>
            <p class="mt-n3">Digite a senha:</p>
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
            <v-btn @click.stop="dialog = false" color="grey" :variant="'text'">cancelar</v-btn>
            </div>


        </div>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import DisplayLogo from "@/components/DisplayLogo.vue"
//

const emits = defineEmits(['close']) 
const err = ref(false);
const show = ref(false);
const email = ref('');
const password = ref('');
const dialog = ref(false);

function enter() {
    console.log('hello world')
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