<template lang="html">
  <div class="q-pa-md">
    <div class="q-gutter-md column">
      <h1 class="text-h3">Register</h1>
      <q-input
        v-model="email"
        filled
        type="email"
        hint="Email"
        lazy-rules
        :rules="[val => !!val || 'Email is required']"
      />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password"
        lazy-rules
        :rules="[val => !!val || 'Password is required']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="Register" type="submit" color="secondary" @click="register"  />
      <q-btn label="Login" :to="{ name: 'Login' }" color="primary" flat />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AuthService from '../services/AuthService'

export default {
  setup () {
    const password = ref('')
    const email = ref('')
    const isPwd = ref(true)

    const register = async () => {
      const credentials = {
        email: email.value,
        password: password.value
      }
      const response = await AuthService.register(credentials)
      console.log(response)
    }
    return {
      password,
      isPwd,
      email,

      register
    }
  }
}
</script>

<style lang="css" scoped>
</style>
