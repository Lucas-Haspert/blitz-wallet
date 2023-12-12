<template>
    <div>
        <NavBar></NavBar>
        <div>
            <div v-if="loadingStatus" class="LoadingSpinner">
                <LoadingSpinner></LoadingSpinner>
            </div>
            <div v-else>
                <!-- Title section -->
                <h1>Inversiones</h1>
                <!-- Form section -->
                <div class="row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <form>
                            <select class="form-select" v-model="coin" @change="getBalance">
                                <option disabled value="">Seleccione una cripto</option>
                                <option v-bind:value="'btc'">Bitcoin</option>
                                <option v-bind:value="'eth'">Ethereum</option>
                                <option v-bind:value="'usdc'">USD Coin</option>
                                <option v-bind:value="'usdt'">USD Tether</option>
                            </select>
                        </form>
                    </div>
                </div>
                <!-- Message section -->
                <div v-if="message !== null && message !== ''">
                    <h3>{{ message }}</h3>
                </div>
                <!-- Data section -->
                <div v-if="totalBalance !== null">
                    <h3>Balance total</h3>
                    <h3 :class="{ 'text-danger': totalBalance < 0, 'text-success': totalBalance >= 0 }">${{ totalBalance }}</h3>
                </div>
                <div v-if="dailyCryptoBalance !== null">
                    <h3>Balance de transacciones diarias</h3>
                    <small class="form-text text-muted">La tabla muestra números positivos para una mayor compra en cantidad de criptos y números negativos para una mayor venta en cantidad de criptos.</small>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(amount, date) in dailyCryptoBalance" :key="date">
                                <td>{{ date }}</td>
                                <td>{{ amount }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from "vuex";
import NavBar from "@/components/NavBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
    name: "InvestmentsView",
    components: {
        NavBar,
        LoadingSpinner,
    },
    data: () => ({
        message: null,
        totalBalance: null,
        dailyCryptoBalance: null,
    }),
    async created() {

    },
    computed: {
        ...mapState({
            loadingStatus: (state) => state.loading.loadingStatus,
        }),
    },
    watch: {},
    methods: {
        cleanData() {
            this.message = null;
            this.totalBalance = null;
            this.dailyCryptoBalance = null;
        },
        async getBalance() {
            this.cleanData();

            var response = await this.$store.dispatch('account/getInvestmentsResume', { 'cryptoCode': this.coin });

            if (!response.status) {
                this.message = response.message;
                return;
            }

            this.totalBalance = response.body.totalBalance;
            this.dailyCryptoBalance = response.body.dailyCryptoBalance;
        },
    },
};
</script>