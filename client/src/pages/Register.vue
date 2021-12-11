<template lang="html">
  <div class="q-pa-md fullscreen flex flex-center column">
    <h1 class="text-h4">Register</h1>
    <q-form
      ref="registerForm"
      @submit.prevent="handleSingup"
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
        :rules="[ val => val.length >= 8 || 'Please use minimum 8 characters']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="text-red" v-html="registrationError" />
      <q-btn label="Register" :loading="loading" type="submit" color="secondary" />
      <q-btn label="Login" :to="{ name: 'Login' }" color="primary" flat />

    </q-form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter()

    const password = ref('')
    const email = ref('')
    const isPwd = ref(true)
    const registrationError = ref(null)
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

    const handleSingup = async (evt) => {
      loading.value = true
      const credentials = {
        email: email.value,
        password: password.value
      }
      $store.dispatch('auth/register', credentials).then((data) => {
        showNotif()
        loading.value = false
        $router.push({ name: 'Login' })
      }, (error) => {
        loading.value = false
        registrationError.value = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      })
    }

    return {
      password,
      isPwd,
      email,
      registrationError,
      loading,

      handleSingup
    }
  }
}
</script>

<style lang="css" scoped>
</style>
