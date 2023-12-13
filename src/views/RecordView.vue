<template>
  <NavBar></NavBar>
  <div>
    <div v-if="loadingStatus" class="LoadingSpinner">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div v-else>
      <!-- Title section -->
      <h1>Historial de transacciones</h1>
      <template v-if="!editingTransaction">
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
                  @click="editTransaction(transaction)" v-if="!editingTransaction">Editar</button>
                <button id="btnDelete" class="btn btn-lg btn-danger w-25" type="submit"
                  @click="deleteTransaction(transaction._id)" v-if="!editingTransaction">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <!-- Edit section -->
        <h2>Editando Transacción</h2>
        <div class="row">
          <div class="mx-auto col-10 col-md-8 col-lg-6">
            <form @submit.prevent="updateTransaction">
              <div class="form-group">
                <label for="editCryptoCode">Crypto</label>
                <select id="editCryptoCode" v-model="editingTransaction.crypto_code" class="form-control" required>
                  <option v-bind:value="'btc'">Bitcoin</option>
                  <option v-bind:value="'eth'">Ethereum</option>
                  <option v-bind:value="'usdc'">USD Coin</option>
                  <option v-bind:value="'usdt'">USD Tether</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editAction">Acción</label>
                <select id="editAction" v-model="editingTransaction.action" class="form-control" required>
                  <option value="purchase">Compra</option>
                  <option value="sale">Venta</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editCryptoAmount">Cantidad</label>
                <input type="text" id="editCryptoAmount" v-model="editingTransaction.crypto_amount" class="form-control"
                  pattern="[0-9]+(\.[0-9]+)?" title="Ingresa un número decimal positivo" required>
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
              <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancelar</button>
            </form>
          </div>
        </div>
      </template>
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
    let username = this.$store.getters['account/username'];
    this.$store.dispatch('transaction/getHistoricalTransactions', username);
  },
  data() {
    return {
      editingTransaction: null,
    };
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
    editTransaction(transaction) {
      this.editingTransaction = { ...transaction };
    },
    cancelEdit() {
      this.editingTransaction = null;
    },
    async updateTransaction() {
      await this.$store.dispatch('transaction/updateTransaction', this.editingTransaction);
      this.editingTransaction = null;
    },
    async deleteTransaction(transactionId) {
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