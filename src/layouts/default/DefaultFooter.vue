<template>
    <div class="default-footer">
        <div class="my-6">
            <div v-for="item in links">
                <v-btn class="text-caption":variant="'text'" density="compact" @click.stop="openLink(item.route)">{{ item.label }}</v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const links = ref([
    {
        label: 'Início',
        route: '/'
    },
    {
        label: 'Marcar atendimento',
        route: '/agendar'
    },
    {
        label: 'Página do cliente (Login necessário)',
        route: '/profile'
    },
    {
        label: 'Página do cliente - Atendimentos realizados (Login necessário)',
        route: '/meus-atendimentos'
    },
    {
        label: 'Página do funcionario (Login necessário)',
        route: '/staff'
    },
    {
        label: 'Página de ADMIN (Login necessário)',
        route: '/admin'
    },
])

function openLink(link) {
    router.push(link)
}


</script>

<style>
.default-footer {
    border-top: 6px solid #e5e5e5;
    border-radius: 6px;
}
</style>