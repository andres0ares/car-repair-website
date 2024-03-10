<template>
  <HelloWorld />
</template>

<script setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import { useViewStore } from '@/store/views';
  import { onMounted } from 'vue';
  const view = useViewStore();

  onMounted(() => {
    view.setViewUserType('client')
  })
</script>

