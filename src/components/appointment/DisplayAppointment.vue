<template>
    <div>
        <p>{{ props.data?.carro?.nome ?? 'none' }}</p>
    </div>
    <p>hello world</p>
    <p>{{ props.data }}</p>
</template>

<script setup>
import { onMounted } from 'vue';


const props = defineProps({
    data: Object
})

onMounted(() => {
    console.log(props.data.carro.nome)
})

</script>