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
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">ACCIÓN</th>
            <th scope="col">MONEDA</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in historicalTransactions" :key="transaction._id">
            <td>{{ transaction.datetime }}</td>
            <td>{{ transaction.action }}</td>
            <td>{{ transaction.crypto_code }}</td>
            <td>{{ transaction.crypto_amount }}</td>
            <td>
              <button id="btnEdit" class="btn btn-lg btn-primary w-25" type="submit"
                @click="editTransaction(transaction)" :disabled="true">Editar</button>
              <button id="btnDelete" class="btn btn-lg btn-danger w-25" type="submit"
                @click="deleteTransaction(transaction._id)">Eliminar</button>
            </td>
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
  name: 'RecordView',
  components: {
    NavBar,
    LoadingSpinner,
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
    async editTransaction(transaction) {
      alert("Wow wow... I'm not ready yet!" + " " + transaction);
    },
    async deleteTransaction(transactionId) {
      // Delete the transaction.
      await this.$store.dispatch('transaction/deleteTransaction', transactionId);
    }
  }
}
</script>

<style>
button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>