<template>
  <HelloWorld />
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'

  import { onMounted } from 'vue';
  
  import { getPagamentos } from '@/api/pagamentos';
  import { getCars } from '@/api/cars';
  import { getServicos } from '@/api/servico';

  import { useViewStore } from '@/store/views';
  import { useAppStore } from '@/store/app';

  const view = useViewStore();
  const store = useAppStore();  


  onMounted(() => {
    view.setViewUserType('client');
    view.setViewPage('home');

    if (["none", "error"].includes(store.getCars?.status)) getCars();
    if (["none", "error"].includes(store.getPagamentos?.status)) getPagamentos();
    if (["none", "error"].includes(store.getServicos?.status)) getServicos();

  })
  
</script>

<style>
.tt {
  clear: both;
  position: absolute;
}
</style>

