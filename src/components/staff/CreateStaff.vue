<template>
    <v-container class="main-card-create-car pb-16">
      <v-row>
        <v-col md="4">
  
          <p class="text-left text-h6">{{props.edit ? 'Editar' : 'Adicionar novo'}} funcionário</p>
          
          <v-text-field
            v-model="obj.nome"
            class="mt-4"
            density="compact"
            label="Nome"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            v-model="obj.email"
            class="mt-4"
            density="compact"
            label="Email"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            v-model="obj.senha"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            class="mt-4"
            density="compact"
            label="Senha"
            variant="outlined"
          ></v-text-field>
  
          <p v-if="!validate" class="text-caption "> * Todos os campos devem ser preenchidos.</p>
        </v-col>
        <v-col md="8">
          <DisplayCar :obj="obj" />
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
          <!-- <v-btn
            :loading="loading"
            :disabled="loading || feedback.show"
            class="float-left ml-4"
            :color="'black'"
            @click="_delete"
            >Remover</v-btn
          > -->
        </template>
  
        <v-btn
          v-else
          :loading="loading"
          :disabled="!validate || loading || feedback.show"
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
  import DisplayCar from "@/components/cars/DisplayCar.vue";
  import { ref, onMounted, watch, computed } from "vue";
  import { create as createS, edit as editS } from "@/api/staff";
  ("@/api/cars.js");
  
  const obj = ref({
    id: undefined,
    nome: undefined,
    email: undefined,
    senha: undefined,
  });
  const show = ref(false)
  const loading = ref(false);
  const feedback = ref({
    show: false,
    err: true,
  });
  
  const emits = defineEmits(["close", "update"]);
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
  
  const validate = computed(() => {
    if(obj.value.email == undefined || obj.value.email == '') return false;
    if(obj.value.nome == undefined || obj.value.nome == '') return false;
    if(obj.value.senha == undefined || obj.value.senha == '') return false;
    return true
  })
  
  function handleEdit() {
    obj.value = JSON.parse(JSON.stringify(props.edit));
  }
  
  function create() {
    loading.value = true;
  
    createS(obj.value)
    .then((_e) => {
      feedback.value.err = false;
      emits("update");
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

    console.log(obj.value)
  
    editS(obj.value)
      .then((_e) => {
        feedback.value.err = false;
        emits("update");
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
    // loading.value = true;
  
    // del(car.value.id)
    // .then((_e) => {
    //   feedback.value.err = false;
    //   getCars();
    // })
    // .catch((_) => {
    //   console.log(_);
    //   feedback.value.err = true;
    // })
    // .finally(() => {
    //   loading.value = false;
    //   feedback.value.show = true;
    //   setTimeout(() => {
    //     feedback.value.show = false;
    //     emits("close");
    //   }, 4000);
    // });
  }
  </script>
  
  <style>
  .main-card-create-car {
    border: 1px solid #00000022;
    border-radius: 6px;
    width: 100%;
  }
  </style>
  