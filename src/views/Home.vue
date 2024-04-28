<template>
  <HelloWorld />
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'

  import { onMounted } from 'vue';
  
  import { getPagamentos } from '@/api/pagamentos';
  import { getCars } from '@/api/cars';

  import { useViewStore } from '@/store/views';
  import { useAppStore } from '@/store/app';

  const view = useViewStore();
  const store = useAppStore();

  onMounted(() => {
    view.setViewUserType('client')
    if (["none", "error"].includes(store.getCars?.status)) getCars();
    if (["none", "error"].includes(store.getCars?.status)) getPagamentos();
  })
  
</script>

