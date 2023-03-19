<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">FECHA</th>
        <th scope="col">ACCIÓN</th>
        <th scope="col">MONEDA</th>
        <th scope="col">CANTIDAD</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" v-bind:key="index">
        <td>{{ datetimeFormatted(item.datetime) }}</td>
        <td>{{ item.action }}</td>
        <td>{{ item.crypto_code }}</td>
        <td>{{ item.crypto_amount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { datetimeFormatted } from '@/common/helpers/datetime'

export default {
  name: "TableRecord",
  components: {},
  props: {
    items: Array,
  },
  methods: {
    datetimeFormatted,
  },
}
</script>