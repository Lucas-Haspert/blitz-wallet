<template>
  <div>
    <h1>LOGIN</h1>
    <div class="row">
      <div class="mx-auto col-10 col-md-8 col-lg-6">
        <form>
          <h3>Por favor, inicie sesión</h3>
          <div class="form-floating">
            <input type="text" :maxlength="20" class="form-control" id="inputUsername" v-model="username">
            <label for="inputUsername">Usuario</label>
            <small id="inputHelp" class="form-text text-muted">El usuario debe tener entre 4 y 20 caracteres y no puede
              tener caracteres especiales.</small>
          </div>
          <button id="btnLogin" class="btn btn-lg btn-primary w-100" type="submit" @click="doLogin"
            :disabled='disableBtn'>Iniciar sesión</button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import router from '@/router/index';

export default {
  name: 'LoginView',
  components: {

  },
  data: () => ({
    username: null,
    disableBtn: true,
  }),
  computed: {
    ...mapState({
      isDisabled: function () {
        return this.disableBtn;
      },
    }),
  },
  watch: {
    username: {
      handler: function () {
        if (this.username !== null && this.username.trim() !== '' && this.username.trim().length >= 4 && this.username.trim().length <= 20) {
          return this.disableBtn = false;
        } else {
          return this.disableBtn = true;
        }
      },
      deep: true
    },
  },
  methods: {
    doLogin() {
      if (this.username === null || this.username.length === "") {
        return alert('Debe ingresar un username.');
      }

      if (this.username.length < 4) {
        return alert('El username debe tener al menos 4 caracteres.');
      }

      if (this.username.length > 20) {
        return alert('El username debe tener menos de 20 caracteres.');
      }

      if (/^[a-zA-Z0-9]{4,20}$/.test(this.username)) {
        this.$store.dispatch('account/login', { 'username': this.username });
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