<template>
    <NavBar></NavBar>
    <div>
        <div v-if="loadingStatus" class="LoadingSpinner">
            <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else>
            <!-- Title section -->
            <h1>Resumen</h1>
            <!-- Data section -->
            <table class="table table-striped">
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
            <div class="container">
                <div class="row">
                    <div class="col">
                        <img class="logo" alt="Binance logo" src="../assets/images/bitcoin-btc-logo.png">
                        <p>Bitcoin (btc)</p>
                        <p>{{ amountCryptos[0] }}</p>
                        <p>${{ valuedCryptos[0] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="Bitcoin logo" src="../assets/images/ethereum-eth-logo.png">
                        <p>Ethereum (eth)</p>
                        <p>{{ amountCryptos[1] }}</p>
                        <p>${{ valuedCryptos[1] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="BNB logo" src="../assets/images/usd-coin-usdc-logo.png">
                        <p>USD Coin (usdc)</p>
                        <p>{{ amountCryptos[2] }}</p>
                        <p>${{ valuedCryptos[2] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="Dogecoin logo" src="../assets/images/tether-usdt-logo.png">
                        <p>USD Tether (usdt)</p>
                        <p>{{ amountCryptos[3] }}</p>
                        <p>${{ valuedCryptos[3] }}</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <p class="text-center">La valorización de las criptos son calculadas con la cotización de SatoshiTango.</p>
            </div>
            <!-- Messagge section -->
            <div v-if="message !== null && message !== ''">
                <h3>{{ message }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
    name: 'SummaryView',
    components: {
        NavBar,
        LoadingSpinner,
    },
    data: () => ({
        funds: null,
        amountCryptos: [],
        valuedCryptos: [],
        message: null,
    }),
    async created() {
        this.funds = localStorage.getItem("funds");

        var availableCryptos = await this.$store.dispatch('coin/getCoins');

        if (!availableCryptos.status) {
            this.message = valuedCryptos.message;
            return;
        }

        this.amountCryptos = [];

        for (let i = 0; i < availableCryptos.body.length; i++) {
            this.amountCryptos.push(availableCryptos.body[i].amount);
        }

        this.valuedCryptos = [];

        for (let i = 0; i < availableCryptos.body.length; i++) {
            var valuedCryptos = await this.$store.dispatch('coin/getCryptoValued', { 'cryptoAmount': availableCryptos.body[i].amount, 'cryptoCode': availableCryptos.body[i].crypto, 'exchangeUrl': 'satoshitango' });

            if (!valuedCryptos.status) {
                this.message = valuedCryptos.message;
                return;
            }

            this.valuedCryptos.push(valuedCryptos.body);
        }
    },
    computed: {
        ...mapState({
            loadingStatus: state => state.loading.loadingStatus,
        })
    },
    watch: {

    },
    methods: {

    }
}
</script>