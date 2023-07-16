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
                            <select class="form-select" v-model="exchange" disabled>
                                <option disabled value="">Seleccione un exchange</option>
                                <option v-bind:value="'argenbtc'">ARGENBTC</option>
                                <option v-bind:value="'otheroption'">Otro exchange</option>
                            </select>
                            <select class="form-select" v-model="coin">
                                <option disabled value="">Seleccione una cripto</option>
                                <option v-bind:value="'btc'">Bitcoin</option>
                                <option v-bind:value="'eth'">Ethereum</option>
                                <option v-bind:value="'usdt'">Tether</option>
                                <option v-bind:value="'usdc'">USD Coin</option>
                                <option v-bind:value="'bnb'">BNB</option>
                                <option v-bind:value="'xrp'">XRP</option>
                                <option v-bind:value="'busd'">Binance USD</option>
                                <option v-bind:value="'doge'">Dogecoin</option>
                            </select>
                            <div class="form-floating">
                                <input type="decimal" min="0" :maxlength="10" class="form-control" id="inputFunds"
                                    v-model="amount">
                                <label for="inputFunds">Cantidad a comprar</label>
                                <small class="form-text text-muted">Utilice un punto para cargar valores decimales.</small>
                            </div>
                            <button id="btnBuy" class="btn btn-lg btn-primary w-100" type="submit" @click="buy"
                                :disabled='disableBtn'>Comprar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div v-else>
                <!-- Sale section -->
                <div class="row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <form>
                            <select class="form-select" v-model="exchange" disabled>
                                <option disabled value="">Seleccione un exchange</option>
                                <option v-bind:value="'argenbtc'">ARGENBTC</option>
                                <option v-bind:value="'otheroption'">Otro exchange</option>
                            </select>
                            <select class="form-select" v-model="coin">
                                <option disabled value="">Seleccione una cripto</option>
                                <option v-bind:value="'btc'">Bitcoin</option>
                                <option v-bind:value="'eth'">Ethereum</option>
                                <option v-bind:value="'usdt'">Tether</option>
                                <option v-bind:value="'usdc'">USD Coin</option>
                                <option v-bind:value="'bnb'">BNB</option>
                                <option v-bind:value="'xrp'">XRP</option>
                                <option v-bind:value="'busd'">Binance USD</option>
                                <option v-bind:value="'doge'">Dogecoin</option>
                            </select>
                            <div class="form-floating">
                                <input type="decimal" min="0" :maxlength="10" class="form-control" id="inputFunds"
                                    v-model="amount">
                                <label for="inputFunds">Cantidad a vender</label>
                                <small class="form-text text-muted">Utilice un punto para cargar valores decimales.</small>
                            </div>
                            <button id="btnSell" class="btn btn-lg btn-primary w-100" type="submit" @click="sell"
                                :disabled='disableBtn'>Vender</button>
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
        amount: '',
        coin: '',
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
        switchTransaction() {
            // Clear the data.
            this.exchange = '';
            this.amount = '';
            this.coin = '';
            this.message = '';

            // Switch.
            if (this.$refs.switchTransaction.checked) {
                this.transactionType = false;
                return;
            }

            // Switch.
            if (!this.$refs.switchTransaction.checked) {
                this.transactionType = true;
                return;
            }
        },
        async buy() {
            // Check the exchange.
            //if (this.exchange === null || this.exchange === '') {
            //    this.message = "Seleccione un exchange.";
            //    return;
            //}

            // Check the amount.
            if (this.amount === null || this.amount === '') {
                this.message = "Ingrese una cantidad.";
                return;
            }

            // Check the coin.
            if (this.coin === null || this.coin === '') {
                this.message = "Seleccione una criptomoneda.";
                return;
            }

            // Make the transaction.
            this.message = await this.$store.dispatch('transaction/buy', { 'cryptoAmount': this.amount, 'cryptoCode': this.coin });
        },
        async sell() {
            // Check the exchange.
            //if (this.exchange === null || this.exchange === '') {
            //    this.message = "Seleccione un exchange.";
            //    return;
            //}

            // Check the amount.
            //if (this.amount === null || this.amount === '') {
            //    this.message = "Ingrese una cantidad.";
            //    return;
            //}

            // Check the coin.
            //if (this.coin === null || this.coin === '') {
            //    this.message = "Seleccione una criptomoneda.";
            //    return;
            //}

            // Make the transaction.
            this.message = await this.$store.dispatch('transaction/sell', { 'cryptoAmount': this.amount, 'cryptoCode': this.coin });
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