<template>

    <v-expand-transition>
        <Appointment v-if="appt.length == 0 || showAdd" :services="servicos" :cars="cars" @add="addNewAppointment" :days="dias_disponiveis" @close="showAdd = false" :cancel="appt.length > 0" />
    </v-expand-transition>

    <div v-if="appt.length > 0">
        <div>
            <p>Agendamentos adicionados:</p>
            <DisplayAppointment v-for="item in appt" :data="item" />
            <v-btn icon="mdi-plus" @click="showAdd = true"></v-btn>
        </div>

        <p class="text-left text-body-2 my-3">Forma de pagamento:</p>

        <v-select
            v-model="forma_pagamento"
            label="Tipo de pagamento"
            item-title="label"
            item-value="value"
            :items="pagamentos"
            variant="outlined"
        ></v-select>

        <v-btn v-if="user.client.logged" @click="finish" >finalizar</v-btn>
        <div v-else>
            <p>Efetue o login para finalizar</p>
            <LoginDefault client @close="() => login = false" />
        </div>
    </div>
     
</template>

<script setup>
//components
import Appointment from "@/components/appointment/Appointment.vue";
import DisplayAppointment from "@/components/appointment/DisplayAppointment.vue";
import LoginDefault from "@/components/login/LoginDefault.vue";

//imports
import { getAll } from "@/api/servico";
import { getCars } from "@/api/cars";
import { getPagamentos } from "@/api/pagamentos";
import { create, getAllAtendimentos } from "@/api/contrato";
import { onMounted, ref, computed } from "vue";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { useViewStore } from "@/store/views";

const servicos = ref([]);
const store = useAppStore();
const showAdd = ref(true);
const user = useUserStore();
const login = ref(false);
const view = useViewStore();
const dias_disponiveis = ref([]);

const appt = ref([]);
const forma_pagamento = ref(undefined);

const cars = computed(() => {
    return ["none", "error"].includes(store.getCars?.status) ? [] : store.getCars.data
})

const pagamentos = computed(() => {
    return ["none", "error"].includes(store.getPagamentos?.status) ? [] : store.getPagamentos.data
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
        console.log(_)
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