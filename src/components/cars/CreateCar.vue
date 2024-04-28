<template>
  <v-container class="main-card-create-car pb-16">
    <v-row>
      <v-col md="4">

        <p class="text-left text-h6">{{props.edit ? 'Editar' : 'Adicionar novo'}} carro</p>
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

        <p v-if="!validateCar" class="text-caption "> * Todos os campos devem ser preenchidos.</p>
      </v-col>
      <v-col md="8">
        <DisplayCar :car="car" />
      </v-col>
    </v-row>

    <div class="mt-2" v-if="feedback.show">
      <v-alert
        v-if="feedback.err"
        class="mb-4"
        :variant="'tonal'"
        :density="'compact'"
        :type="'warning'"
        :text="'Algo deu errado, tente noamente mais tarde.'"
      ></v-alert>
      <v-alert
        v-else
        class="mb-4"
        :density="'compact'"
        :variant="'tonal'"
        :type="'success'"
        :text="'Alteração realizada com sucesso!'"
      ></v-alert>
    </div>

    <div class="mt-2">
      <template v-if="props.edit">
        <v-btn
          :loading="loading"
          :disabled="loading || feedback.show"
          class="float-left"
          :color="'black'"
          @click="edit"
          >salvar</v-btn
        >
        <v-btn
          :loading="loading"
          :disabled="loading || feedback.show"
          class="float-left ml-4"
          :color="'black'"
          @click="_delete"
          >Remover</v-btn
        >
      </template>

      <v-btn
        v-else
        :loading="loading"
        :disabled="!validateCar || loading || feedback.show"
        class="float-left"
        :color="'black'"
        @click="create"
        >Criar</v-btn
      >
      <v-btn
        :disabled="loading || feedback.show"
        class="float-left ml-4"
        :color="'black'"
        :variant="'text'"
        @click.stop="emits('close')"
        >cancelar</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import MiniCarsSelect from "@/components/cars/MiniCarsSelect.vue";
import DisplayCar from "@/components/cars/DisplayCar.vue";
import imgs from "@/utils/imgs.json";
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { getCars, createCar, editCar, deleteCar } from "@/api/cars";
("@/api/cars.js");

const car = ref({
  id: undefined,
  img: undefined,
  nome: undefined,
  modelo: undefined,
  descricao: undefined,
});

const loading = ref(false);
const feedback = ref({
  show: false,
  err: true,
});

const emits = defineEmits(["close"]);
const props = defineProps({
  edit: Object,
});

watch(
  () => props.edit,
  (_) => {
    handleEdit();
  }
);



onMounted(() => {
  if (props.edit) handleEdit();
});

const validateCar = computed(() => {
  if(car.value.img == undefined || car.value.img == '') return false;
  if(car.value.nome == undefined || car.value.nome == '') return false;
  if(car.value.modelo == undefined || car.value.modelo == '') return false;
  if(car.value.descricao == undefined || car.value.descricao == '') return false;
  return true
})

function handleEdit() {
  car.value = JSON.parse(JSON.stringify(props.edit));
}

function create() {
  loading.value = true;

  createCar(car.value)
  .then((_e) => {
    feedback.value.err = false;
    getCars();
  })
  .catch((_) => {
    console.log(_);
    feedback.value.err = true;
  })
  .finally(() => {
    loading.value = false;
    feedback.value.show = true;
    setTimeout(() => {
      feedback.value.show = false;
      emits("close");
    }, 4000);
  });
}

function edit() {
  loading.value = true;

  editCar(car.value)
    .then((_e) => {
      feedback.value.err = false;
      getCars();
    })
    .catch((_) => {
      console.log(_);
      feedback.value.err = true;
    })
    .finally(() => {
      loading.value = false;
      feedback.value.show = true;
      setTimeout(() => {
        feedback.value.show = false;
        emits("close");
      }, 4000);
    });
}

function _delete() {
  loading.value = true;

  deleteCar(car.value.id)
  .then((_e) => {
    feedback.value.err = false;
    getCars();
  })
  .catch((_) => {
    console.log(_);
    feedback.value.err = true;
  })
  .finally(() => {
    loading.value = false;
    feedback.value.show = true;
    setTimeout(() => {
      feedback.value.show = false;
      emits("close");
    }, 4000);
  });
}
</script>

<style>
.main-card-create-car {
  border: 1px solid #00000022;
  border-radius: 6px;
  width: 100%;
}
</style>
