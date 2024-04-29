<template>

    <div class="msg pa-10 mt-16">
        <p class="text-body-2">Aqui você acompanha todos os seus atendimentos. Crie um novo contrato clicando no botão abaixo:</p>

        <v-btn @click="openCreateAppointment" class="mt-4" variant="outlined" size="small" rounded >Marcar serviço</v-btn>
    </div>    

    <div class="my-16"></div>

    <div v-if="!loading">

        <div v-if="contratos_formated.length == 0">
            <p class="text-button-2">Você ainda não possui um contrato.</p>
        </div>

        <div  v-for="(contrato, i) in contratos_formated" class="card-contrato pa-4">

            <p class="text-body-2 font-weight-bold">Contrato {{ contratos_formated.length - i }}, do dia {{ contrato.data }}.</p>
            <p class="text-body-2 mt-1">Status: {{ contrato.status }}</p>
            <p class="text-body-2 mt-1">Mecanico responsável: {{ contrato.funcionario  ?? 'Pendente'}}.</p>
            <p class="text-body-2 mt-1">Valor: {{ (contrato.valor == contrato.valor_total) ? `R$ ${contrato.valor}` : `de R$ ${contrato.valor} por R$ ${contrato.valor_total}. Desconto de R$ ${contrato.desconto}` }}</p>

            <p class="text-button my-2">atendimentos:</p>

            <div v-for="atendimento in contrato.atendimentos">
                <div class="p">
                    <AppointmentDisplay :data="atendimento" />
                </div>
            </div>
        </div>
    </div>
   
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useViewStore } from '@/store/views';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllByClient } from "@/api/contrato";
import { computed } from 'vue';

import AppointmentDisplay from "@/components/appointment/AppointmentDisplay.vue";

const view = useViewStore()
const router = useRouter();
const user = useUserStore();
const loading = ref(true);

const contratos = ref([])
const contratos_formated = computed(() => {

    let res = []

    contratos.value.forEach((e) => {

        let at = {
            agendamento: e.atendimento_data,
            placa: e.atendimento_placa,
            carro: {
                img: e.carro_img,
                nome: e.carro_nome,
                modelo: e.carro_modelo,
            },
            servico: {
                nome: e.servico_nome,
                img: e.servico_img,
            }
        }

        let i = res.findIndex((_) => _.id == e.contrato_id)
        if(i == -1) {
            res.push({
                id: e.contrato_id,
                data: new Date(e.contrato_data).toLocaleDateString('pt-br'),
                status: ['Aguardando aprovação', 'Aprovado'][e.contrato_status],
                valor: e.pagamento_valor,
                desconto: e.pagamento_desconto,
                valor_total: e.pagamento_valor_total,
                funcionario: e.funcionario_nome,
                atendimentos: [at]
            })
        }else{
            res[i].atendimentos.push(at);
        }

    })

    return res 
})

function getAllContratos() {
    getAllByClient(user.client.info.id)
    .then((_) => {
        contratos.value = _.reverse();
    })
    .finally(() => {
        loading.value = false;
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

<style>
.card-contrato {
    border: 2px solid #f5f5f5;
    border-radius: 6px;
    margin-bottom: 10px;
}

.p {
    position: relative;
    display: flex;
    overflow-x: auto;
}

.msg {
    background-color: #f5f5f5;
    border-radius: 6px;
}
</style>