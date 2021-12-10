<template lang="html">
  <div class="q-pa-md">
    <h1 class="text-h4 text-weigth-bold">Login</h1>
    <q-form
      ref="loginForm"
      @submit.prevent="handleLogin"
      class="q-gutter-sm"
      >
      <q-input
        v-model="email"
        filled
        dense
        type="email"
        placeholder="Email"
        lazy-rules
        :rules="[val => !!val || 'Email is required']"
      />
      <q-input
        v-model="password"
        filled
        dense
        :type="isPwd ? 'password' : 'text'"
        placeholder="Password"
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

      <div class="text-red" v-html="loginError" />
      <q-btn label="Login" type="submit" color="secondary" :loading="loading" />
      <q-btn label="Register" :to="{ name: 'Register' }" color="primary" flat />

    </q-form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $store = useStore()
    const $router = useRouter()

    const loginForm = ref(null)
    const password = ref('')
    const email = ref('')
    const isPwd = ref(true)
    const loginError = ref(null)
    const successfull = ref(false)
    const loading = ref(false)

    const loggedIn = computed(() => $store.state.auth.status.loggedIn)

    onMounted(() => {
      if (loggedIn.value) {
        $router.push({ name: 'Lists' })
      }
    })

    function reset () {
      loginForm.value.resetValidation()
    }

    const handleLogin = async (evt) => {
      loading.value = true
      const credentials = {
        email: email.value,
        password: password.value
      }
      $store.dispatch('auth/login', credentials).then((data) => {
        $router.push({ name: 'Lists' })
      }, (error) => {
        loading.value = false
        loginError.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      })
    }
    return {
      loginForm,
      password,
      isPwd,
      email,
      loginError,
      loggedIn,
      successfull,
      loading,

      handleLogin,
      reset
    }
  }
}
</script>

<style lang="css" scoped>
</style>
