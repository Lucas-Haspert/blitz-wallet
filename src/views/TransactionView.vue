<template>
    <NavBar></NavBar>
    <div>
        <div v-if="loadingStatus" class="LoadingSpinner">
            <LoadingSpinner></LoadingSpinner>
        </div>
        <div v-else>
            <!-- Title section -->
            <div v-if="transactionType">
                <h1>Compra</h1>
            </div>
            <div v-else>
                <h1>Venta</h1>
            </div>
            <!-- Switch section -->
            <div class="row">
                <div class="mx-auto col-10 col-md-8 col-lg-6">
                    <form>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" ref="switchTransaction"
                                @click="switchTransaction">
                        </div>
                    </form>
                </div>
            </div>
            <!-- Transaction section -->
            <div v-if="transactionType">
                <!-- Purchase section -->
                <div class="row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <form>
                            <select class="form-select" v-model="exchange">
                                <option disabled value="">Seleccione un exchange</option>
                                <option v-bind:value="'bitso'">Bitso</option>
                                <option v-bind:value="'buenbit'">Buenbit</option>
                                <option v-bind:value="'cryptomkt'">CryptoMarket</option>
                                <option v-bind:value="'lemoncash'">Lemon Cash</option>
                                <option v-bind:value="'ripio'">Ripio</option>
                                <option v-bind:value="'satoshitango'">SatoshiTango</option>
                            </select>
                            <select class="form-select" v-model="coin">
                                <option disabled value="">Seleccione una cripto</option>
                                <option v-bind:value="'btc'">Bitcoin</option>
                                <option v-bind:value="'eth'">Ethereum</option>
                                <option v-bind:value="'usdc'">USD Coin</option>
                                <option v-bind:value="'usdt'">USD Tether</option>
                            </select>
                            <div class="form-floating">
                                <input type="decimal" min="0" :maxlength="10" class="form-control" id="inputFunds"
                                    v-model="amount">
                                <label for="inputFunds">Cantidad a comprar</label>
                                <small class="form-text text-muted">Utilice un punto para cargar valores decimales.</small>
                            </div>
                            <button id="btnBuy" class="btn btn-lg btn-primary w-100" type="submit"
                                @click="buy">Comprar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div v-else>
                <!-- Sale section -->
                <div class="row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <form>
                            <select class="form-select" v-model="exchange">
                                <option disabled value="">Seleccione un exchange</option>
                                <option v-bind:value="'bitso'">Bitso</option>
                                <option v-bind:value="'buenbit'">Buenbit</option>
                                <option v-bind:value="'cryptomkt'">CryptoMarket</option>
                                <option v-bind:value="'lemoncash'">Lemon Cash</option>
                                <option v-bind:value="'ripio'">Ripio</option>
                                <option v-bind:value="'satoshitango'">SatoshiTango</option>
                            </select>
                            <select class="form-select" v-model="coin">
                                <option disabled value="">Seleccione una cripto</option>
                                <option v-bind:value="'btc'">Bitcoin</option>
                                <option v-bind:value="'eth'">Ethereum</option>
                                <option v-bind:value="'usdc'">USD Coin</option>
                                <option v-bind:value="'usdt'">USD Tether</option>
                            </select>
                            <div class="form-floating">
                                <input type="decimal" min="0" :maxlength="10" class="form-control" id="inputFunds"
                                    v-model="amount">
                                <label for="inputFunds">Cantidad a vender</label>
                                <small class="form-text text-muted">Utilice un punto para cargar valores decimales.</small>
                            </div>
                            <button id="btnSell" class="btn btn-lg btn-primary w-100" type="submit"
                                @click="sell">Vender</button>
                        </form>
                    </div>
                </div>
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
    name: 'TransactionView',
    components: {
        NavBar,
        LoadingSpinner,
    },
    data: () => ({
        transactionType: true,
        exchange: '',
        coin: '',
        amount: '',
        message: '',
    }),
    created() {

    },
    computed: {
        ...mapState({
            loadingStatus: state => state.loading.loadingStatus,
        })
    },
    watch: {

    },
    methods: {
        checkEntryData() {
            // Check the exchange.
            if (this.exchange === null || this.exchange === '') {
                this.message = "Seleccione un exchange.";
                return false;
            }

            // Check the coin.
            if (this.coin === null || this.coin === '') {
                this.message = "Seleccione una criptomoneda.";
                return false;
            }

            // Check the amount.
            if (this.amount === null || this.amount === '') {
                this.message = "Ingrese una cantidad.";
                return false;
            }

            return true;
        },
        switchTransaction() {
            // Clear the data.
            this.exchange = '';
            this.amount = '';
            this.coin = '';
            this.message = '';

            // Switch.
            if (this.$refs.switchTransaction.checked) {
                this.transactionType = false;
            } else {
                this.transactionType = true;
            }

            return;
        },
        async buy() {
            if (!this.checkEntryData()) {
                return;
            }

            // Make the transaction.
            this.message = await this.$store.dispatch('transaction/buy', { 'cryptoAmount': this.amount, 'cryptoCode': this.coin, 'exchangeUrl': this.exchange });
        },
        async sell() {
            if (!this.checkEntryData()) {
                return;
            }

            // Make the transaction.
            this.message = await this.$store.dispatch('transaction/sell', { 'cryptoAmount': this.amount, 'cryptoCode': this.coin, 'exchangeUrl': this.exchange });
        },
    }
}
</script>

<style>
.form-switch {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>