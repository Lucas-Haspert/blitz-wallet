<template>
  <nav>
    <ul>
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/transaction">Comprar-Vender</router-link></li>
      <li><router-link to="/exchange">Exchange</router-link></li>
      <li><router-link to="/forex">Divisas</router-link></li>
      <li><router-link to="/record">Historial</router-link></li>
      <li><router-link to="/summary">Resumen</router-link></li>
      <li><router-link to="/investments">Inversiones</router-link></li>
      <li><router-link to="/account">Cuenta</router-link></li>
      
      <li style="float:right"><router-link to="/login" v-on:click.prevent="logout">Cerrar sesión</router-link></li>
    </ul>
  </nav>
  <router-view />
</template>
  
<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      // Logout.
      this.$store.dispatch('account/logout');
    },
  }
}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>