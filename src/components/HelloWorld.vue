<template>
  <v-container class="fill-height max-width">
    <v-responsive class="d-flex align-center text-center fill-height">
      
      <v-carousel hide-delimiters show-arrows="hover" cycle>
        <v-carousel-item v-for="(item, i) in imgs" :key="i">
          <div class="mt-12" />
          <v-img class="img" contain :src="item.img" />
        </v-carousel-item>
      </v-carousel>

      <div class="mt-n16"></div>

      <DisplayLogo class="mt-n10" />

      <p class="mt-8 mb-4">Nossos serviços:</p>

      <MiniCarsSelect :cars="servicos" />

      <p class="mt-8 mb-4">Carros que atendemos:</p>

      <MiniCarsSelect :cars="imgs" />      
      
      <div class="py-14" />

      <v-btn @click="openCreateAppointment">Marcar serviço</v-btn>


    </v-responsive>
  </v-container>
</template>

<script setup>

  import MiniCarsSelect from "./cars/MiniCarsSelect.vue";
  import DisplayLogo from "./DisplayLogo.vue";
  import imgs from "@/utils/imgs.json"
  import { onMounted,  ref } from "vue";
  import { getAll } from "@/api/servico"
  import { useRouter } from "vue-router";

  const servicos = ref([]);
  const router = useRouter();

  function getServicos() {
    getAll().then((_) => {
      servicos.value = _;
    })
    .catch((_) => {
      console.log(_)
    })
  };

  function openCreateAppointment() {
    router.push('/agendar')
  };

  onMounted(() => {
    if(servicos.value.length == 0) getServicos();
  });

</script>

<style>
.img {
  max-width: 700px;
  margin: 0 auto;
}

.max-width {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
