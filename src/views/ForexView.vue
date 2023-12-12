<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Mercado de divisas</h1>
      <!-- Table section -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th colspan="6">Dólar estadounidense</th>
          </tr>
          <tr>
            <th scope="col">BANCO</th>
            <th scope="col">COMPRA</th>
            <th scope="col">VENTA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currencies" v-bind:key="index">
            <td>{{ index.toString().toUpperCase() }}</td>
            <td>${{ item.ask }}</td>
            <td>${{ item.bid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'ForexView',
  components: {
    NavBar,
    LoadingSpinner,
  },
  created() {
    this.$store.dispatch('forex/getAll');
  },
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      currencies: state => state.forex.currencies,
    })
  },
  watch: {

  },
  methods: {

  }
}
</script>