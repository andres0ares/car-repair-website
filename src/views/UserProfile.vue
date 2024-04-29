<template>
    <div class="main-card-profile ma-10 pa-10">
        <p class="text-h6">Olá, {{ user.client.info.nome }}.</p>
        <p class="text-body-2">Aqui estão seu dados cadastrais:</p>

        <br>
        <br>

        <p class="text-body-2"><span><v-icon size="small" icon="mdi-account"></v-icon></span> <span class="font-weight-bold">Nome:</span> {{ user.client.info.nome }}</p>
        <p class="text-body-2"><span><v-icon size="small" icon="mdi-mail"></v-icon></span> <span class="font-weight-bold">E-mail:</span> {{ user.client.info.email }}</p>
        <p class="text-body-2"><span><v-icon size="small" icon="mdi-home-city"></v-icon></span> <span class="font-weight-bold">Cidade:</span> {{ user.client.info.cidade }}</p>
        <p class="text-body-2"><span><v-icon size="small" icon="mdi-soccer"></v-icon></span> <span class="font-weight-bold">É flamenguista?:</span> {{ user.client.info.e_flamengo ? 'sim.' : 'Não.' }}</p>
        <p class="text-body-2"><span><v-icon size="small" icon="mdi-television"></v-icon></span> <span class="font-weight-bold">Assiste One Piece?:</span> {{ user.client.info.assiste_one_piece ? 'sim.' : 'Não.' }}</p>
        
    </div>
    
</template>

<script setup>

import { useUserStore } from '@/store/user';
import { useViewStore } from '@/store/views';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const view = useViewStore()
const router = useRouter();
const user = useUserStore();


onMounted(() => {
    if(!user.client.logged) router.push('/');

    view.setViewUserType('client');
    view.setViewPage('profile-page');

})

</script>

<style>
.main-card-profile {
    border: 1px solid #000000;
    border-radius: 6px;
    margin: 0 auto;
}
</style>