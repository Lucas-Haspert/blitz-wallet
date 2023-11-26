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
                        <p>{{ amountCoins[0] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="Bitcoin logo" src="../assets/images/ethereum-eth-logo.png">
                        <p>Ethereum (eth)</p>
                        <p>{{ amountCoins[1] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="BNB logo" src="../assets/images/usd-coin-usdc-logo.png">
                        <p>USD Coin (usdc)</p>
                        <p>{{ amountCoins[2] }}</p>
                    </div>
                    <div class="col">
                        <img class="logo" alt="Dogecoin logo" src="../assets/images/tether-usdt-logo.png">
                        <p>USD Tether (usdt)</p>
                        <p>{{ amountCoins[3] }}</p>
                    </div>
                </div>
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
        amountCoins: [],
    }),
    async created() {
        // Get the funds.
        this.funds = localStorage.getItem("funds");

        // Get the coins.
        var availableCoins = await this.$store.dispatch('coin/getCoins');

        // Clean the coins.
        this.amountCoins = [];

        // Set the coins.  
        this.amountCoins.push(availableCoins[0].amount);
        this.amountCoins.push(availableCoins[1].amount);
        this.amountCoins.push(availableCoins[2].amount);
        this.amountCoins.push(availableCoins[3].amount);
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