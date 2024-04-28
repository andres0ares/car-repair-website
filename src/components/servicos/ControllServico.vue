<template>
    <v-container>
  
      <p class="text-h5">Gerenciar serviços</p>
  
      <v-btn
        v-for="(item, i ) in options"
        v-if="!create"
        class="mt-10 mr-2"
        color="black"
        :variant="option == i ? 'flat' : 'outlined'"
        @click.stop="option = i"
        >{{ item }}</v-btn
      >
  
      <v-window v-model="option" :touch="false">
        <v-window-item :value="0">
          <div class="pt-10">
            <p class="text-body-2 font-weight-bold">Serviços disponíveis:</p>
            <v-text-field
                class="float-left search-report-data mt-2"
                v-model="search"
                :variant="'outlined'"
                :density="'compact'"
                label="Pesquisar"
                :append-inner-icon="'mdi-magnify'"
            ></v-text-field>
            <div class="w-100"></div>
            <MiniCarsSelect :cars="displayServicos" select icon="mdi-pencil" @selected="handleEdit" />
          </div>
          <v-expand-transition>
            <CreateServico v-if="edit" @update="getServicos" :edit="selected" class="mt-10" @close="() => (edit = false)" />
          </v-expand-transition>
        </v-window-item>
        <v-window-item :value="1">
            <CreateServico class="mt-10" @update="getServicos" @close="() => { option = 0 }" />
        </v-window-item>
      </v-window>
    </v-container>
    
  </template>
  
  <script setup>
  
  import CreateServico from "@/components/servicos/CreateServico.vue";
  import MiniCarsSelect from "../cars/MiniCarsSelect.vue";
  
  import { ref, computed, onMounted } from "vue";
  import { getAll } from "@/api/servico";

  const create = ref(false);
  const edit = ref(false);
  const selected = ref(undefined); 
  const servicos = ref([]);
  const option = ref(0);
  const search = ref('')
  const options = ref([
    "Editar",
    "Criar"
  ]);

  const displayServicos = computed(() => {
    return servicos.value.filter((_) => _.nome.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) )
  })

  function getServicos() {
    getAll()
    .then((_) => {
      servicos.value = _;
    })
    .catch((_) => {
      console.log(_)
    })
  }
  
  function handleEdit(_e) {
    edit.value = true;
    selected.value = _e;
  }

  onMounted(() => {
    if(servicos.value.length == 0) getServicos();
  })
  
  </script>