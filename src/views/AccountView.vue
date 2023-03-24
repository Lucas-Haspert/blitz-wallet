<template>
    <NavBar></NavBar>
    <div>
        <h1>Cuenta</h1>
    </div>
</template>
  
<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'AccountView',
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