<template>
  <NavBar></NavBar>
  <div>
    <img class="logo" alt="Blitz Wallet logo" src="../assets/logo-blitz.png">
    <h1>BLITZ WALLET</h1>
    <h4>Blitz Wallet es un sistema ficticio para gestionar tu billetera virtual.</h4>
    <h4>Compre, venda, consulte el estado del mercado y mucho más.</h4>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
  }
}
</script>

<style>
.logo {
  width: 50%;
}
</style>