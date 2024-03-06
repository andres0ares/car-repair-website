<template>
  <v-container>
    <v-row>
      <v-col md="4">
        <p class="text-left text-h6">Adicionar novo carro</p>
        <p class="text-left text-body-2 mb-3">Selecione a imagem:</p>

        <MiniCarsSelect
          select
          :cars="imgs"
          @selected="(e) => (car.img = e.img)"
        />

        <v-text-field
          v-model="car.nome"
          class="mt-4"
          density="compact"
          label="Nome do carro"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="car.modelo"
          class="mt-4"
          density="compact"
          label="Modelo"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="car.descricao"
          class="mt-4"
          density="compact"
          label="Descrição"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col md="8">
        <DisplayCar :car="car" />
      </v-col>
    </v-row>
    <v-btn class="float-left" :color="'black'" @click="create">criar</v-btn>
  </v-container>
</template>

<script setup>
import MiniCarsSelect from "@/components/cars/MiniCarsSelect.vue";
import DisplayCar from "@/components/cars/DisplayCar.vue";
import imgs from "@/utils/imgs.json";
import { ref } from "vue";
import axios from "axios";

const car = ref({
  img: undefined,
  nome: undefined,
  modelo: undefined,
  descricao: undefined,
});

function create() {
  axios
    .post("http://localhost:8000/api/car", car.value)
    .then((_e) => {
      console.log(_e);
    })
    .catch((_) => {
      console.log(_);
    });
}
</script>
