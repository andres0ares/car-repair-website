<template>
    <div>
        <p>outras coisas...</p>
        <div  v-for="item in links">
            <v-btn :variant="'plain'" @click.stop="openLink(item.route)">{{ item.label }}</v-btn>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const test = ref('rde')
const router = useRouter()

const links = ref([
    {
        label: 'Início',
        route: '/'
    },
    {
        label: 'Pégina do cliente (Login necessário)',
        route: '/meus-atendimentos'
    },
    {
        label: 'Página de ADMIN (login necessário)',
        route: '/admin'
    },
    {
        label: 'Página do funcionario (login necessario)',
        route: '/staff'
    }
])

function openLink(link) {
    router.push(link)
}


</script>