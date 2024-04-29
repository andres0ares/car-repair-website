<template>
 <div class="main-nav-bar pa-5">
  <p class="float-left">Peli motto</p>
  
  <div class="float-right">
    <DisplayUser />
  </div>
  <div v-if="user.client.logged && view.viewPage != 'client-page' && view.viewUserType == 'client' " class="float-right">
    <v-btn @click="openClientePage" class="mr-4" append-icon="mdi-car" variant="outlined" rounded size="small">Meus atendimentos</v-btn>
  </div>
 </div>
</template>

<script setup>

  import DisplayUser from "@/components/login/DisplayUser.vue"
  import { useUserStore } from "@/store/user";
  import { useViewStore } from "@/store/views";
  import { useRouter } from "vue-router";

  const user = useUserStore();
  const router = useRouter();
  const view = useViewStore();

  function openClientePage() {
    router.push('/meus-atendimentos')
  };


</script>

<style scoped>
.main-nav-bar {
  width: 100%;
  border-bottom: 1px solid #00000023 ;
}
</style>
