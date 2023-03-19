<template>
  <NavBar></NavBar>
  <div class="rename">
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else class="cartera-vacia">
      <h1>Historial de transacciones</h1>
      <TableRecord v-bind:items="transactions"></TableRecord>
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
  computed: {
    ...mapState({
      loadingStatus: state => state.loading.loadingStatus,
      transactions: state => state.transaction.transactions,
    })
  },
  created() {
    this.$store.dispatch('transaction/getAll', localStorage.getItem('username'));
  }
}
</script>