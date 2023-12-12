<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">EXCHANGE</th>
        <th scope="col">COMPRA</th>
        <th scope="col">COMPRA TOTAL</th>
        <th scope="col">VENTA</th>
        <th scope="col">VENTA TOTAL</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" v-bind:key="index">
        <!-- Exchange -->
        <td>{{ index.toString().toUpperCase() }}</td>
        <!-- Ask -->
        <td v-if="fiat === 'ars'">${{ item.ask }}</td>
        <td v-else-if="fiat === 'usd'">US${{ item.ask }}</td>
        <td v-else>{{ item.ask }}</td>
        <!-- Total Ask -->
        <td v-if="fiat === 'ars'">${{ item.totalAsk }}</td>
        <td v-else-if="fiat === 'usd'">US${{ item.totalAsk }}</td>
        <td v-else>{{ item.totalAsk }}</td>
        <!-- Bid -->
        <td v-if="fiat === 'ars'">${{ item.bid }}</td>
        <td v-else-if="fiat === 'usd'">US${{ item.bid }}</td>
        <td v-else>{{ item.bid }}</td>
        <!-- Total Bid -->
        <td v-if="fiat === 'ars'">${{ item.totalBid }}</td>
        <td v-else-if="fiat === 'usd'">US${{ item.totalBid }}</td>
        <td v-else>{{ item.totalBid }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableExchange",
  components: {},
  props: {
    items: Array,
    fiat: String,
  },
  methods: {

  },
}
</script>