<template>
  <h1>LOGIN</h1>
  <SignIn></SignIn>
</template>
  
<script>
import SignIn from '@/components/SignIn.vue'

export default {
  name: 'LoginView',
  components: {
    SignIn,
  }
}
</script>