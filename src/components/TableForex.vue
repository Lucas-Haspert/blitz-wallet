<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th colspan="6">{{ currency }}</th>
      </tr>
      <tr>
        <th scope="col">BANCO</th>
        <th scope="col">COMPRAR</th>
        <th scope="col">VENDER</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" v-bind:key="index">
        <td>{{ index.toString().toUpperCase() }}</td>
        <td>${{ item.ask }}</td>
        <td>${{ item.bid }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableForex",
  components: {},
  props: {
    currency: String,
    items: Array,
  },
  methods: {

  },
}
</script>