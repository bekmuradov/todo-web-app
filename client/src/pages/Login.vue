<template lang="html">
  <div class="q-pa-md">
    <div class="q-gutter-md column">
      <h1 class="text-h3">Login</h1>
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
      <q-btn label="Login" type="submit" color="secondary" @click="login"  />
      <q-btn label="Register" :to="{ name: 'Register' }" color="primary" flat />
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

    const login = async () => {
      const credentials = {
        email: email.value,
        password: password.value
      }
      const response = await AuthService.login(credentials)
      console.log(response)
    }
    return {
      password,
      isPwd,
      email,

      login
    }
  }
}
</script>

<style lang="css" scoped>
</style>
