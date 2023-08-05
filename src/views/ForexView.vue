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
      <TableForex currency="Dólar" v-bind:items="currencies"></TableForex>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import TableForex from '@/components/TableForex.vue'

export default {
  name: 'ForexView',
  components: {
    NavBar,
    LoadingSpinner,
    TableForex,
  },
  created() {
    // Get the currencies.
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