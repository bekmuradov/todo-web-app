<template lang="html">
  <div class="q-pa-md fullscreen flex flex-center column">

    <account-input-header
      label="Login to Todo App"
    />

    <q-form
      @submit.prevent="handleLogin"
      >
      <account-input-text
        v-model="loginForm.email"
        type="email"
        placeholder="Email"
        :rules="[val => !!val || 'Email is required']"
      />

      <account-input-password
        v-model="loginForm.password"
      />

      <div class="text-red" v-html="loginError" />
      <div class="q-gutter-sm">
        <btn
          label="Login"
          color="secondary"
          type="submit"
          :disable="!loginFormValid"
        />
        <btn
          label="Register"
          color="primary"
          :to="{ name: 'Register' }"
          flat
        />
      </div>

    </q-form>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter()

    const loginForm = reactive({
      email: '',
      password: ''
    })

    const loginFormValid = computed(() => {
      if (loginForm.email && loginForm.password) {
        return true
      } return false
    })
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

    // function reset () {
    //   loginForm.value.resetValidation()
    // }

    function showNotif () {
      $q.notify({
        message: 'Success',
        color: 'positive'
      })
    }

    const handleLogin = async (evt) => {
      loading.value = true
      const credentials = {
        email: loginForm.email,
        password: loginForm.password
      }
      $store.dispatch('auth/login', credentials).then((data) => {
        showNotif()
        $router.push({ name: 'Lists' })
      }, (error) => {
        loading.value = false
        loginError.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      })
    }
    return {
      loginForm,
      isPwd,
      loginError,
      loggedIn,
      successfull,
      loading,
      loginFormValid,

      handleLogin
    }
  },
  components: {
    'account-input-text': require('./Shared/AccountInputText').default,
    'account-input-password': require('./Shared/AccountInputPassword').default,
    'account-input-header': require('./Shared/AccountInputHeader').default
  }
}
</script>
