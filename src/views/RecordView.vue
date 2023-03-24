<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Historial de transacciones</h1>
      <!-- Title section -->
      <!-- Table section -->
      <TableRecord v-bind:items="transactions"></TableRecord>
      <!-- Table section -->
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
    // Get the transactions
    this.$store.dispatch('transaction/getAll', localStorage.getItem('username'));
  },
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      transactions: state => state.transaction.transactions,
    })
  },
  watch: {

  },
  methods: {

  }
}
</script>