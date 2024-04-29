<template>
    <LoginDefault v-if="!user.staff.logged" staff @close="handleClose" />
    <template v-else>
        <v-container>
            <v-btn v-for="item in options" class="mr-2 text-none mb-4" @click.stop="option = item" :variant="option.id == item.id ? 'tonal' : 'outlined'" :color=" option.id == item.id ? 'black' : 'grey'" rounded :density="'compact'">{{ item.name }}</v-btn>
        </v-container> 

        <v-window v-model="option.id" :touch="false">
        <v-window-item :value="0">
            <v-container>

                <v-data-table :headers="headers" :group-by="[{ key: 'atendimento_data'}]" :items="options[0].data">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                        <tr>
                            <td :colspan="columns.length" @click="toggleGroup(item)" class="cursor-pointer">
                            <VBtn
                                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                                size="small"
                                variant="text"
                            ></VBtn>
                            {{ new Date(item.items[0].raw.atendimento_data).toLocaleDateString('pt') == (new Date()).toLocaleDateString('pt') ? 'Atendimentos de hoje' :  `Atendimentos do dia ${new Date(item.items[0].raw.atendimento_data).toLocaleDateString('pt')}`}}
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.atendimento_data="{ item }">
                        {{ new Date(item.atendimento_data).toLocaleDateString('pt') }}
                    </template>
                </v-data-table>




            </v-container>
        </v-window-item>
        <v-window-item :value="1">
            <v-container>
                <v-data-table :headers="headers" :group-by="[{ key: 'contrato_id'}]" :items="options[1].data">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                        <tr>
                            <td :colspan="columns.length" @click="toggleGroup(item)" class="cursor-pointer">
                            <VBtn
                                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                                size="small"
                                variant="text"
                            ></VBtn>
                            Contrato criado em {{ new Date(item.items[0].raw.contrato_data).toLocaleDateString('pt') }} por {{ item.items[0].raw.cliente_nome  }}, {{ item.items[0].raw.cliente_email}}.
                            <v-btn @click.stop="handleAprove(item.items[0].raw.contrato_id)" class="ml-4" variant="outlined" size="small" rounded>Aprovar</v-btn>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.atendimento_data="{ item }">
                        {{ new Date(item.atendimento_data).toLocaleDateString('pt') }}
                    </template>
                </v-data-table>
            </v-container>
        </v-window-item>
        <v-window-item :value="2">
            <v-container>
                <p class="text-button mb-4">Aguardando pagamento:</p>
                <v-data-table :headers="headers" :group-by="[{ key: 'contrato_id'}]" :items="c_aguardando_pagamento">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                        <tr>
                            <td :colspan="columns.length" @click="toggleGroup(item)" class="cursor-pointer">
                            <VBtn
                                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                                size="small"
                                variant="text"
                            ></VBtn>
                            Contrato criado em {{ new Date(item.items[0].raw.contrato_data).toLocaleDateString('pt') }} por {{ item.items[0].raw.cliente_nome  }}, {{ item.items[0].raw.cliente_email}}.
                            <v-btn @click.stop="handleAprovePayment(item.items[0].raw)" class="ml-4" variant="outlined" size="small" rounded>Confirmar pagamento</v-btn>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.atendimento_data="{ item }">
                        {{ new Date(item.atendimento_data).toLocaleDateString('pt') }}
                    </template>
                </v-data-table>
                <template v-if="c_outros.length > 0">
                    <p class="text-button">Outros:</p>
                    <v-data-table :headers="headers" :group-by="[{ key: 'contrato_id'}]" :items="c_outros">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                        <tr>
                            <td :colspan="columns.length" @click="toggleGroup(item)" class="cursor-pointer">
                            <VBtn
                                :icon="isGroupOpen(item) ? '$expand' : '$next'"
                                size="small"
                                variant="text"
                            ></VBtn>
                            Contrato criado em {{ new Date(item.items[0].raw.contrato_data).toLocaleDateString('pt') }} por {{ item.items[0].raw.cliente_nome  }}, {{ item.items[0].raw.cliente_email}}.
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.atendimento_data="{ item }">
                        {{ new Date(item.atendimento_data).toLocaleDateString('pt') }}
                    </template>
                </v-data-table>
                </template>
            </v-container>
        </v-window-item>
        </v-window>

    </template>        
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useViewStore } from '@/store/views';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getContratosPendentes, getContratosFuncionario, aproveContrato, getContratosAtendimento} from "@/api/contrato";
import { aprovePagamento } from "@/api/pagamentos";
import LoginDefault from "@/components/login/LoginDefault.vue";
import { computed } from 'vue';

const view = useViewStore()
const router = useRouter();
const user = useUserStore();

const options = ref([
  {
    name: 'Fila de atendimento',
    id: 0,
    data: []
  },
  {
    name: 'Contratos Aguardando aprovação',
    id: 1,
    data: []
  },
  {
    name: 'Meus contratos Aprovados',
    id: 2,
    data: []
  },
]);

const option = ref(options.value[0]);

const headers = ref([
    { title: 'Data atendimento', key: 'atendimento_data' },
    { title: 'Carro', key: 'carro_nome' },
    { title: 'Serviço', key: 'servico_nome' },
    { title: 'Placa', key: 'carro_placa' },
    { title: 'Modelo', key: 'carro_modelo'},
    { title: 'Forma de pagamento', key: 'pagamento_forma' },
])

function handleAprove(i) {
    aproveContrato(i, user.staff.info.id)
    .then(() => {
        refresh()
    })
    .catch((_) => {
        console.log(_)
    })
}

function handleAprovePayment(i) {
    let body = {
        contrato_id: i.contrato_id,
        forma_pagamento: i.pagamento_forma
    }
    aprovePagamento(body)
    .then(() => {
        refresh()
    })
    .catch((_) => {
        console.log(_)
    })
}

const c_aguardando_pagamento = computed(() => {
    return options.value[2].data.filter((e) => e.confirmacao_pagamento == 0)
})

const c_outros = computed(() => {
    return options.value[2].data.filter((e) => e.confirmacao_pagamento != 0)
})

function handleClose() {
    console.log('here');
    getPendentes();
}

function refresh() {
    getPendentes();
    getStaffContratos();
    getAtendimentos();
}

function getPendentes() {
    getContratosPendentes()
    .then((_) => {
        options.value[1].data = _
    })
}

function getStaffContratos() {
    getContratosFuncionario(user.staff.info.id)
    .then((_) => {
        options.value[2].data = _
    })
}

function getAtendimentos() {
    getContratosAtendimento()
    .then((_) => {
        options.value[0].data = _
    })
}

onMounted(() => {
   
    view.setViewUserType('staff');
    view.setViewPage('staff-page');

    if(user.staff.logged) {
        refresh();
    }

})

</script>