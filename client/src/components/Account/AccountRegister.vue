<template lang="html">
  <div class="q-pa-md fullscreen flex flex-center column">

    <account-input-header
      label="Create your Account"
    />

    <q-form
      @submit.prevent="handleSignup"
    >
      <account-input-text
        v-model="signupForm.email"
        type="email"
        placeholder="Email"
        :rules="[val => !!val || 'Email is required']"
      />

      <account-input-password
        v-model="signupForm.password"
      />

      <div class="text-red" v-html="signupError" />
      <div class="q-gutter-sm">
        <btn
          label="Register"
          color="secondary"
          type="submit"
          :disable="!signupFormValid"
        />
        <btn
          label="Login instead"
          color="primary"
          :to="{ name: 'Login' }"
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

    const signupForm = reactive({
      email: '',
      password: ''
    })

    const signupFormValid = computed(() => {
      if (signupForm.email && signupForm.password) {
        return true
      } return false
    })
    // const password = ref('')
    // const email = ref('')
    const isPwd = ref(true)
    const signupError = ref(null)
    const successfull = ref(false)
    const loading = ref(false)

    const loggedIn = computed(() => $store.state.auth.status.loggedIn)

    onMounted(() => {
      if (loggedIn.value) {
        $router.push({ name: 'Lists' })
      }
    })

    function showNotif () {
      $q.notify({
        message: 'Success',
        color: 'positive'
      })
    }

    const handleSignup = async (evt) => {
      loading.value = true
      const credentials = {
        email: signupForm.email,
        password: signupForm.password
      }
      $store.dispatch('auth/register', credentials).then((data) => {
        showNotif()
        $router.push({ name: 'Lists' })
      }, (error) => {
        loading.value = false
        signupError.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      })
    }
    return {
      signupForm,
      isPwd,
      signupError,
      loggedIn,
      successfull,
      loading,
      signupFormValid,

      handleSignup
    }
  },
  components: {
    'account-input-text': require('./Shared/AccountInputText').default,
    'account-input-password': require('./Shared/AccountInputPassword').default,
    'account-input-header': require('./Shared/AccountInputHeader').default
  }
}
</script>
