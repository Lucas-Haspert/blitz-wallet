<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Historial de transacciones</h1>
      <!-- Table section -->
      <TableRecord v-bind:items="historicalTransactions"></TableRecord>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import TableRecord from '@/components/TableRecord.vue'

export default {
  name: 'RecordView',
  components: {
    NavBar,
    LoadingSpinner,
    TableRecord,
  },
  created() {
    // Get the username.
    let username = this.$store.getters['account/username'];
    
    // Get the historical transactions.
    this.$store.dispatch('transaction/getHistoricalTransactions', username);
  },
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      historicalTransactions: state => state.transaction.historicalTransactions,
    })
  },
  watch: {

  },
  methods: {

  }
}
</script>