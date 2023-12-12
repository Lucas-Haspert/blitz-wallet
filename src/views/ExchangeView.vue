<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Exchanges</h1>
      <!-- Selects section -->
      <div>
        <select class="form-select" v-model="selectedFiat">
          <option disabled value="">Seleccione una moneda</option>
          <option v-bind:value="'ars'">Peso argentino</option>
          <option v-bind:value="'usd'">Dólar estadounidense</option>
        </select>
        <select class="form-select" v-model="selectedCoin">
          <option disabled value="">Seleccione una cripto</option>
          <option v-bind:value="'btc'">Bitcoin</option>
          <option v-bind:value="'eth'">Ethereum</option>
          <option v-bind:value="'usdc'">USD Coin</option>
          <option v-bind:value="'usdt'">USD Tether</option>
        </select>
      </div>
      <!-- Table section -->
      <div>
        <div v-if="selectedFiat === 'ars' && selectedCoin !== ''">
          <TableExchange v-bind:items="exchanges" fiat='ars'></TableExchange>
        </div>
        <div v-if="selectedFiat === 'usd' && selectedCoin !== ''">
          <TableExchange v-bind:items="exchanges" fiat='usd'></TableExchange>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import TableExchange from '@/components/TableExchange.vue'

export default {
  name: 'ExchangeView',
  components: {
    NavBar,
    LoadingSpinner,
    TableExchange,
  },
  data: () => ({
    selectedFiat: '',
    selectedCoin: '',
    items: Array,
  }),
  created() {
    this.$store.dispatch('exchange/resetState');
  },
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      exchanges: state => state.exchange.exchanges,
    })
  },
  watch: {
    selectedFiat: {
      handler: function () {
        this.search();
      },
      deep: true
    },
    selectedCoin: {
      handler: function () {
        this.search();
      },
      deep: true
    },
  },
  methods: {
    search() {
      // Check the selectedFiat.
      if (this.selectedFiat === null || this.selectedFiat === '') {
        return;
      }

      // Check the selectedCoin.
      if (this.selectedCoin === null || this.selectedCoin === '') {
        return;
      }

      // Get the exchanges.
      this.$store.dispatch('exchange/getAll', { 'fiat': this.selectedFiat, 'coin': this.selectedCoin });
    },
  }
}
</script>

<style>
.form-select {
  margin-top: 5px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 5px;
}
</style>