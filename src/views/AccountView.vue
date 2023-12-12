<template>
    <NavBar></NavBar>
    <div>
        <!-- Title section -->
        <h1>Cuenta</h1>
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
        <!-- Load of funds section -->
        <h2>Carga de fondos</h2>
        <div class="row">
            <div class="mx-auto col-10 col-md-8 col-lg-6">
                <form>
                    <div class="form-floating">
                        <input type="decimal" min="0" :maxlength="9" class="form-control" id="inputFunds" v-model="amount">
                        <label for="inputFunds">Monto a cargar</label>
                        <small class="form-text text-muted">No puede cargar saldos negativos ni saldos mayores a
                            $100.000.000</small>
                        <br>
                        <small class="form-text text-muted">Utilice un punto para cargar valores decimales.</small>
                    </div>
                    <button id="btnLogin" class="btn btn-lg btn-primary w-100" type="submit" @click="loadFunds"
                        :disabled='disableBtn'>Cargar fondos</button>
                </form>
            </div>
        </div>
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
    data: () => ({
        amount: null,
        disableBtn: true,
    }),
    created() {

    },
    computed: {
        ...mapState({
            username: state => state.account.username,
            funds: state => state.account.funds,
        }),
    },
    watch: {
        amount: {
            // Button enabled and disabled.
            handler: function () {
                if (this.amount === null || this.amount === '') {
                    return this.disableBtn = true;
                }

                if (this.amount > 0 && this.amount <= 100000000) {
                    return this.disableBtn = false;
                } else {
                    return this.disableBtn = true;
                }
            },
            deep: true
        },
    },
    methods: {
        loadFunds() {
            // Check if the amount is null or is empty.
            if (this.amount === null || this.amount === '') {
                return;
            }

            // Check if the amount has a character other than 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 or '.'.
            for (var i = 0; i < this.amount.length; i++) {
                if (this.amount.charAt(i) === '0') {
                    continue;
                }

                if (this.amount.charAt(i) === '1') {
                    continue;
                }

                if (this.amount.charAt(i) === '2') {
                    continue;
                }

                if (this.amount.charAt(i) === '3') {
                    continue;
                }

                if (this.amount.charAt(i) === '4') {
                    continue;
                }

                if (this.amount.charAt(i) === '5') {
                    continue;
                }

                if (this.amount.charAt(i) === '6') {
                    continue;
                }

                if (this.amount.charAt(i) === '7') {
                    continue;
                }

                if (this.amount.charAt(i) === '8') {
                    continue;
                }

                if (this.amount.charAt(i) === '9') {
                    continue;
                }

                if (this.amount.charAt(i) === '.') {
                    continue;
                }

                return;
            }

            // Check if the amount is more than 0.
            if (this.amount <= 0) {
                return;
            }

            // Check if the amount is more than 100000000.
            if (this.amount > 100000000) {
                return;
            }

            // Load the amount.
            this.$store.dispatch('account/loadFunds', { 'amount': this.amount });

            // Clear the amount.
            this.amount = null;

            // Clear the input.
            document.getElementById('inputFunds').value = '';
        },
    }
}
</script>

<style></style>