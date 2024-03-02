<template>
    <v-container>
      <v-row>
        <v-col md="4">
  
          <p class="text-left text-h6">Adicionar novo carro</p>
          <p class="text-left text-body-2 mb-3">Selecione a imagem: </p>
  
          <MiniCarsSelect select :cars="imgs" @selected="(e) => car.img = e.img" />
  
          <v-text-field
            v-model="car.name"
            class="mt-4"
            density="compact"
            label="Nome do carro"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            v-model="car.model"
            class="mt-4"
            density="compact"
            label="Modelo"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            v-model="car.description"
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
      <v-btn class="float-left" :color="'black'">criar</v-btn>
    </v-container>
  </template>
  
  <script setup>
  import MiniCarsSelect from "@/components/cars/MiniCarsSelect.vue";
  import DisplayCar from "@/components/cars/DisplayCar.vue"
  import imgs from "@/utils/imgs.json";
  import { ref } from "vue"
  
  const car = ref({
      img: undefined,
      name: undefined,
      model: undefined,
      description: undefined,
  })
  </script>