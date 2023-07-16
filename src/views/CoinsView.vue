<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Monedas</h1>
      <!-- Table section -->
      <TableCoin coin="Dólar" v-bind:items="coins"></TableCoin>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import TableCoin from '@/components/TableCoin.vue'

export default {
  name: 'CoinView',
  components: {
    NavBar,
    LoadingSpinner,
    TableCoin,
  },
  created() {
    // Get the coins.
    this.$store.dispatch('coin/getAll');
  },
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      coins: state => state.coin.coins,
    })
  },
  watch: {

  },
  methods: {

  }
}
</script>