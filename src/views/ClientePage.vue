<template>
    <p>Aqui você acompanha todos os seua atendimentos, você pode criar um novo atendimento clicando no botõa abaixo:</p>

    <v-btn @click="openCreateAppointment">Marcar serviço</v-btn>

    <p>Meus Atendimentos:</p>
    <p>{{ contratos }}</p>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useViewStore } from '@/store/views';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllByClient } from "@/api/contrato";

const view = useViewStore()
const router = useRouter();
const user = useUserStore();

const contratos = ref([])

function getAllContratos() {
    getAllByClient(user.client.info.id)
    .then((_) => {
        contratos.value.push(_.reverse());
    })
}

function openCreateAppointment() {
    router.push('/agendar')
};

onMounted(() => {
    if(!user.client.logged) router.push('/');

    view.setViewUserType('client');
    view.setViewPage('client-page');

    getAllContratos();

})
</script>