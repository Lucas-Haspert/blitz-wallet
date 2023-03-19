<template>
  <div class="login">
    <main class="form-signin w-100 m-auto">
      <form>
        <h1 class="h3 mb-3 fw-normal">Por favor, inicie sesión</h1>
        <div class="form-floating">
          <input type="username" class="form-control" id="floatingInput" placeholder="userexample" v-model="username">
          <label for="floatingInput">Usuario</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="doLogin">Iniciar sesión</button>
      </form>
    </main>
  </div>
</template>
    
<script>
import router from '@/router/index';

export default {
  name: 'NavBar',
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
        // Save the username and the login status in localStorage
        localStorage.setItem('username', this.username);
        localStorage.setItem('isLogged', true);

        router.push({ path: '/' })

      } else {
        alert('Solo se permiten caracteres alfanuméricos.');
      }
    },
  }
}
</script>
  
<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-primary {
  color: white;
  background-color: #42b983;
  border-color: #42b983;
  margin: 15px 0px 15px 0px;
}
</style>