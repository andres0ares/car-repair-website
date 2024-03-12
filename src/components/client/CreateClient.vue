<template>
    <div>
        <p class="text-button">Cadastro cliente Pelli Motto</p>
        <p class="mt-4">Digite seu nome:</p>
        <v-text-field
            v-model="client.nome"
            :variant="'outlined'"
            :density="'compact'"
        ></v-text-field>
        <p class="mt-n3">Digite seu e-mail:</p>
        <v-text-field
            v-model="client.email"
            :variant="'outlined'"
            :density="'compact'"
        ></v-text-field>
        <p class="mt-n3">Digite a senha:</p>
        <v-text-field
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="client.senha"
            :variant="'outlined'"
            :density="'compact'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <p v-if="!validate" class="mb-2">*verifique os dados</p>
        <v-alert v-if="error" border="start" :variant="'tonal'" :type="'error'" class="text-caption my-4 max-w" :text="'ALgo deu errado, tente novamente mais tarde.'"></v-alert>
        <v-btn @click.stop="create" :color="'black'" :loading="loading" :disabled="!validate || loading || error">Criar</v-btn>
        <v-btn @click.stop="emits('close')" :variant="'text'" :disabled="loading || error">cancelar</v-btn>
        <v-alert border="start" :variant="'tonal'" class="text-caption mt-4 max-w" :text="msg"></v-alert>
    </div>
</template>

<script setup>

import { computed, ref } from "vue";
import { createClient } from "@/api/clients";


const emits = defineEmits(['close'])

const loading = ref(false);
const error = ref(false)
const client = ref({
    nome: undefined,
    email: undefined,
    senha: undefined,
})

const msg = ref('Aviso: Este sistema é apenas para fins educacionais e de aprendizado. As senhas e e-mails fornecidos durante o cadastro não são criptografados no banco de dados. Recomendamos usar dados fictícios para garantir a segurança das informações pessoais.')
const showPassword = ref(false);

const validate = computed(() => {
    if(client.value.email == undefined || client.value.email.length < 3) return false
    if(client.value.senha == undefined || client.value.senha.length < 3) return false
    if(client.value.nome == undefined || client.value.nome.length < 3) return false
    return true
})

function create() {
    loading.value = true;

    createClient(client.value).then(() => {
        emits('close')
    })
    .catch(() => {
        error.value = true;
        setTimeout(() => {
            error.value = false;
        }, 3000)
    })
    .finally(() => {
        loading.value = false;
    })
}
</script>

<style>
.max-w {
    max-width: 400px;
}
</style>