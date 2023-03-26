<template>
    <NavBar></NavBar>
    <div>
        <!-- Title section -->
        <h1>Cuenta</h1>
        <!-- Title section -->
        <!-- Data section -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">USUARIO</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ username }}</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th scope="col">SALDO ACTUAL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${{ funds }}</td>
                </tr>
            </tbody>
        </table>
        <!-- Data section -->
        <!-- Load of funds section -->
        <h2>Carga de fondos</h2>
        <div class="row">
            <div class="mx-auto col-10 col-md-8 col-lg-6">
                <form>
                    <div class="form-floating">
                        <input type="number" min="0" class="form-control" id="inputFunds" placeholder="Ingrese el monto a cargar">
                        <label for="inputFunds">Monto a cargar</label>
                        <small id="inputHelp" class="form-text text-muted">No puede cargar saldos negativos ni saldos
                            mayores a $100.000.000</small>
                    </div>
                    <button id="btnLogin" class="btn btn-lg btn-primary w-100" type="submit" @click="loadFunds">Cargar
                        fondos</button>
                </form>
            </div>
        </div>
        <!-- Load of funds section -->
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
            username: state => state.account.username,
            funds: state => state.account.funds,
        })
    },
    watch: {

    },
    methods: {
        loadFunds() {

        },
    }
}
</script>

<style></style>