<template>
  <p class="text-h4">Gerenciar Carros</p>
  <v-btn class="my-10" :variant="'outlined'" @click.stop="create = true"
    >adicionar novo carro</v-btn
  >
  <CreateCar v-if="create" />
  <div class="mt-10 pt-10">
    <p class="text-body-2 font-weight-bold">Carros disponíveis:</p>
    <GetAndDisplay />
  </div>
</template>

<script setup>
import GetAndDisplay from "@/components/cars/GetAndDisplay.vue";
import CreateCar from "@/components/cars/CreateCar.vue";

import { ref } from "vue";

const create = ref(false);
</script>
