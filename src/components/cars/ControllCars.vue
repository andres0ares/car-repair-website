<template>
  <v-container>

    <p class="text-h4">Gerenciar Carros</p>

    <v-btn
      v-if="!create"
      class="my-10"
      :variant="'outlined'"
      @click.stop="create = true"
      >adicionar novo carro</v-btn
    >

    <v-expand-transition>
      <CreateCar v-if="create" class="mt-10" @close="() => (create = false)" />
    </v-expand-transition>
    
    <div class="mt-10 pt-10">
      <p class="text-body-2 font-weight-bold">Carros disponíveis:</p>
      <GetAndDisplay type="mini" select :icon="'mdi-pencil'" @selected="handleEdit" />
    </div>

    <v-expand-transition>
      <CreateCar v-if="edit" :edit="selected" class="mt-10" @close="() => (edit = false)" />
    </v-expand-transition>
  </v-container>
  
</template>

<script setup>

import GetAndDisplay from "@/components/cars/GetAndDisplay.vue";
import CreateCar from "@/components/cars/CreateCar.vue";

import { ref } from "vue";

const create = ref(false);
const edit = ref(false);
const selected = ref(undefined); 

function handleEdit(_e) {
  edit.value = true;
  selected.value = _e;
}

</script>
