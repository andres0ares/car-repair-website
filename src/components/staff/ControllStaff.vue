<template>
    <v-container>
  
      <p class="text-h5">Gerenciar funcionários</p>
  
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
            <p class="text-body-2 font-weight-bold">Funcionários disponíveis:</p>
            <div class="mt-10">
                <v-text-field
                class="float-left search-report-data"
                v-model="search"
                :variant="'outlined'"
                :density="'compact'"
                label="Pesquisar"
                :append-inner-icon="'mdi-magnify'"
                ></v-text-field>
                <v-data-table :search="search" :items="staffs">
                    <template v-slot:header.id="{ item }"><p></p></template>
                    <template v-slot:item.senha="{ item }">
                        <p>**********</p>
                    </template>
                    <template v-slot:item.id="{ item }">
                        <v-btn @click.stop="handleEdit(item)" :size="'small'" :variant="'plain'" :density="'compact'" :icon="'mdi-pencil'"></v-btn>
                    </template>
                </v-data-table>
            </div>
          </div>
          <v-expand-transition>
            <CreateStaff v-if="edit" @update="updateStaffs" :edit="selected" class="mt-10" @close="() => (edit = false)" />
          </v-expand-transition>
        </v-window-item>
        <v-window-item :value="1">
            <CreateStaff class="mt-10" @update="updateStaffs" @close="() => { option = 0 }" />
        </v-window-item>
      </v-window>
    </v-container>
    
  </template>
  
  <script setup>
  import CreateStaff from "@/components/staff/CreateStaff.vue";
  
  import { ref } from "vue";
  import { onMounted } from "vue";
  import { getAll } from "@/api/staff";

  
  const create = ref(false);
  const edit = ref(false);
  const selected = ref(undefined); 
  const option = ref(0);
  const staffs = ref([]);
  const search = ref('');
  const options = ref([
    "Editar",
    "Criar"
  ]);
  
  function handleEdit(_e) {
    edit.value = true;
    selected.value = _e;
  }

  function updateStaffs() {
    getAll().then((_) => {
        staffs.value = _;
    })
    .catch((_) => {
        console.log(_)
    })
    
  }

  onMounted(() => {
    if(staffs.value.length == 0) updateStaffs();
    
  })
  
  </script>