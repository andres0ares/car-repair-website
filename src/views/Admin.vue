<template>
  <div v-if="user.isAdmin">
    <div class="my-16"></div>

    <v-container>
      <v-btn v-for="item in options" class="mr-2 text-none" @click.stop="option = item" :variant="option.id == item.id ? 'tonal' : 'outlined'" :color=" option.id == item.id ? 'black' : 'grey'" rounded :density="'compact'">{{ item.name }}</v-btn>
    </v-container>

    <v-window v-model="option.id">
      <v-window-item :value="0">
        <ControllCars />
      </v-window-item>
      <v-window-item :value="1">
        <ControllServico />
      </v-window-item>
      <v-window-item :value="2">
        <ControllStaff />
      </v-window-item>
      <v-window-item :value="3">
        <ReportDefault />
      </v-window-item>
    </v-window>


    
  </div>
  <LoginAdmin v-else />
</template>

<script setup>
import ControllCars from "@/components/cars/ControllCars.vue";
import ControllServico from "@/components/servicos/ControllServico.vue";
import ControllStaff from "@/components/staff/ControllStaff.vue";
import LoginAdmin from "@/components/LoginAdmin.vue";
import ReportDefault from "@/components/reports/ReportDefault.vue";

import { useUserStore } from "@/store/user";
import { useViewStore } from "@/store/views";
import { ref } from "vue";
import { onMounted } from "vue";

const user = useUserStore();
const options = ref([
  {
    name: 'Gerenciar carros',
    id: 0,
  },
  {
    name: 'Gerenciar serviços',
    id: 1,
  },
  {
    name: 'Gerenciar funcionários',
    id: 2,
  },
  {
    name: 'Relatórios',
    id: 3,
  }
]);

const option = ref(options.value[0]);

const view = useViewStore();
onMounted(() => {
  view.setViewUserType('admin')
})
</script>
