<template>
    <NavBar></NavBar>
    <div>
        <h1>Comprar</h1>
        <h1>Vender</h1>
    </div>
</template>
  
<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'TransactionView',
    components: {
        NavBar,
    },
    created() {

    },
    computed: {
        ...mapState({

        })
    },
    watch: {

    },
    methods: {

    }
}
</script>