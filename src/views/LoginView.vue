<template>
  <div>
    <h1>LOGIN</h1>
    <div class="row">
      <div class="mx-auto col-10 col-md-8 col-lg-6">
        <form>
          <h3>Por favor, inicie sesión</h3>
          <div class="form-floating">
            <input type="username" class="form-control" id="floatingInput" placeholder="userexample" v-model="username">
            <label for="floatingInput">Usuario</label>
            <small id="inputHelp" class="form-text text-muted">El usuario debe tener entre 4 y 20 caracteres y no puede tener caracteres especiales.</small>
          </div>
          <button id="btnLogin" class="btn btn-lg btn-primary w-100" type="submit" @click="doLogin" v-if="username !== null && username !== '' && username.length >= 4 && username.length <= 20">Iniciar sesión</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import router from '@/router/index';

export default {
  name: 'LoginView',
  components: {

  },
  data: () => ({
    username: null,
  }),
  computed: {

  },
  methods: {
    doLogin() {
      // Check if the username entered is empty.
      if (this.username === null || this.username.length === "") {
        return alert('Debe ingresar un username.');
      }

      // Check if the entered username has 4 or more characters.
      if (this.username.length < 4) {
        return alert('El username debe tener al menos 4 caracteres.');
      }

      // Check if the entered username has 20 or less characters.
      if (this.username.length > 20) {
        return alert('El username debe tener menos de 20 caracteres.');
      }

      // This expression only accepts alphanumeric values and limits the number of characters entered from 4 to 20 characters.
      if (/^[a-zA-Z0-9]{4,20}$/.test(this.username)) {
        // Login.
        this.$store.dispatch('account/login', { 'username': this.username });
        
        // Redirect to home.
        router.push({ path: '/' })

      } else {
        return alert('Solo se permiten caracteres alfanuméricos.');
      }
    },
  },
}
</script>

<style>
.btn-primary {
  margin: 15px 0px 15px 0px;
}
</style>