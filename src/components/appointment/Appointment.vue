<template>
    <div class="main-card-appoint-create">

        <p class="text-left text-body-2 my-3">Selecione o serviço:</p>

        <MiniCarsSelect
            select
            :cars="props.services"
            @selected="(e) => (obj.servico = e)"
        />

        <p class="text-left text-body-2 my-3">Selecione seu carro:</p>

        <MiniCarsSelect
            select
            :cars="props.cars"
            @selected="(e) => (obj.carro = e)"
        />

        <v-text-field
            v-model="obj.placa"
            class="mt-4"
            density="compact"
            label="Placa do carro"
            variant="outlined"
            ></v-text-field>

        <p class="text-left text-body-2 my-3">Selecione o dia do agendamento:</p>

        <v-date-picker
            v-model="obj.agendamento"
            max="2024-05-26"
            min="2024-04-26"
        ></v-date-picker>

        <p v-if="!validateCar" class="text-caption mb-3">* Preencha todos campos.</p>

        <div>
            <v-btn
            class=""
            :color="'black'"
            @click="add"
            :disabled="!validateCar"
            >Adicionar</v-btn
            >
            <v-btn
            v-if="props.cancel"
            :variant="'plain'"
            :color="'black'"
            @click.stop="cancell"
            >Cancelar</v-btn
            >
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import MiniCarsSelect from '@/components/cars/MiniCarsSelect.vue';
import { computed } from 'vue';

const props = defineProps({
    cars: Array,
    services: Array,
    cancel: Boolean,
});

const emits = defineEmits(['add', 'close']);

const defaultObj = {
    carro: undefined,
    servico: undefined,
    agendamento: undefined,
    placa: undefined,
};

const obj = ref(defaultObj);

const validateCar = computed(() => {
    return obj.value.servico != undefined 
    && obj.value.carro != undefined
    && obj.value.placa != undefined 
    && obj.value.placa != ''
    && obj.value.agendamento != undefined 
});



function add() {
    emits("add", JSON.parse(JSON.stringify(obj.value)));
    obj.value = defaultObj;
};

function cancell() {
    emits("close");
    obj.value = defaultObj;
}
//
</script>

<style>
.main-card-appoint-create {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 6px;
    border: 1px solid #00000013;
    padding: 20px;
}

</style>