<template>
    <div class="atendimento-card pa-4 mb-10">
        <v-row>
            <v-col md="6">
                <p class="text-button-2 font-weight-bold">{{ props.data.carro.nome }}</p>
                <p class="text-caption">{{ props.data.carro.modelo }}</p>
                <p class="text-caption mt-2">Placa: <span class="font-weight-bold">{{ props.data.placa }}</span> </p>
                <p class="text-caption mt-2"> Serviço: <br> <span class="text-body-2 font-weight-bold">{{ props.data.servico.nome }}</span></p>
                <p v-if="props.data.servico?.preco" class="text-caption mt-2">{{ `valor: R$ ${props.data.servico?.preco}` ?? '' }}</p>
                <p class="text-caption mt-2"> Dia do atendimento: <br> <span class="text-body-2 font-weight-bold">{{ new Date(props.data.agendamento).toLocaleDateString('pt')}}</span></p>
            </v-col>
            <v-col md="6">
                <v-img class="img-display-car" contain :src="props.data.carro?.img" />
                <div class="my-10"></div>
                <v-img class="img-display-car" contain :src="props.data.carro?.img" />
            </v-col>
        </v-row> 
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
})
</script>

<style>
.atendimento-card {
    flex-grow: 1;
    min-width: 300px;
    max-width: 400px;
    border-radius: 6px;
    border: 1px solid #000000;
}

.servico-detail {
    border: 1px solid #000000;
    border-radius: 20px;
}

.img-display-car,
.info-display-car {
  width: 60%;
  margin: 0 auto;
}
</style>