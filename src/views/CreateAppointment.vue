<template>
    <v-container>
        <v-expand-transition>
        <Appointment v-if="appt.length == 0 || showAdd" :services="servicos" :cars="cars" @add="addNewAppointment" :days="dias_disponiveis" @close="showAdd = false" :cancel="appt.length > 0" />
        </v-expand-transition>

        <div v-if="appt.length > 0">

            <br>
            <br>
            <br>

            <div>
                <p class="text-button mb-10">Agendamentos adicionados:</p>
                <AppointmentDisplay v-for="item in appt" :data="item" />
                <v-btn variant="outlined" append-icon="mdi-plus" @click="showAdd = true">Adicionar um novo atendimento</v-btn>
            </div>

            <p class="text-body-2 mt-8">Valor: {{ (valor.valor == valor.valor_total) ? `R$ ${valor.valor}` : `de R$ ${valor.valor} por R$ ${valor.valor_total}. Desconto de R$ ${valor.desconto}` }}</p>

            <p class="text-left text-body-2 my-4">Forma de pagamento:</p>

            <v-select
                v-model="forma_pagamento"
                label="Tipo de pagamento"
                item-title="label"
                item-value="value"
                :items="pagamentos"
                variant="outlined"
                :density="'compact'"
            ></v-select>

            <v-btn v-if="user.client.logged" @click="finish" :disabled="forma_pagamento == undefined || loading" color="black">finalizar</v-btn>
            <div v-else>
                <p>Efetue o login para finalizar</p>
                <LoginDefault client @close="() => login = false" />
            </div>
        </div>
    </v-container>     
</template>

<script setup>
//components
import Appointment from "@/components/appointment/Appointment.vue";
import LoginDefault from "@/components/login/LoginDefault.vue";
import AppointmentDisplay from "@/components/appointment/AppointmentDisplay.vue";

//imports
import { getAll } from "@/api/servico";
import { getCars } from "@/api/cars";
import { getPagamentos } from "@/api/pagamentos";
import { create, getAllAtendimentos } from "@/api/contrato";
import { onMounted, ref, computed } from "vue";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { useViewStore } from "@/store/views";
import { useRouter } from "vue-router";

const servicos = ref([]);
const store = useAppStore();
const showAdd = ref(true);
const user = useUserStore();
const login = ref(false);
const view = useViewStore();
const dias_disponiveis = ref([]);
const router = useRouter()
const appt = ref([]);
const forma_pagamento = ref(undefined);
const loading = ref(false);

const cars = computed(() => {
    return ["none", "error"].includes(store.getCars?.status) ? [] : store.getCars.data
})

const pagamentos = computed(() => {
    return ["none", "error"].includes(store.getPagamentos?.status) ? [] : store.getPagamentos.data
})

const valor = computed(() => {

    let valor = appt.value.map((e) => e.servico.preco ).reduce(function(a, b){ return a + b; }, 0);
    let desconto = user.client.info?.e_flamengo || user.client.info?.assiste_one_piece || user.client.info?.cidade?.toLocaleLowerCase() == 'sousa' ? valor * 0.1 : 0;

    return {
        valor: valor,
        desconto: desconto,
        valor_total: valor - desconto,
    }
})


function getServicos() {
    getAll().then((_) => {
        servicos.value = _;
    })
    .catch((_) => {
        console.log(_)
    })
};

function getAppt() {
    getAllAtendimentos()
    .then((_) => {
        dias_disponiveis.value = _
    })
}

function addNewAppointment(_appt) {
    dias_disponiveis.value.filter((_) => new Date(_.dia).toLocaleDateString('pt') == new Date(_appt.agendamento).toLocaleDateString('pt'))[0].qtd--;
    appt.value.push(_appt);
    showAdd.value = false;
}

function finish() {
    console.log(forma_pagamento)
    loading.value = true;

    const body = {
        cliente: user.client.info,
        atendimentos: appt.value,
        forma_pagamento: forma_pagamento.value
    }

    create(body)
    .then((_) => {
        console.log(_)
    })
    .catch((_) => {
        console.log(_)
    })
    .finally(() => {
        loading.value = false;
        router.push('/meus-atendimentos')
    })

}


onMounted(() => {
 view.setViewUserType('client')
 view.setViewPage('create')
 getAppt();
 if(servicos.value.length == 0) getServicos();
 if (["none", "error"].includes(store.getCars?.status)) getCars();
 if (["none", "error"].includes(store.getPagamentos?.status)) getPagamentos();
});



</script>