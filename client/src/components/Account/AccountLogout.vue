<template>
  <div class="q-pa-md absolute-center">
    <div class="column items-center">
      <account-input-header
        label="Your Todo App Account"
      />

      <div class="text-center q-gutter-sm">
        Loggen in as:
        <div class="text-body1 text-primary">
          {{ userEmail }}
        </div>
      </div>

      <btn
        class="q-mt-md"
        label="Logout"
        color="secondary"
        fullWidth="true"
        @click="handleLogout"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $store = useStore()
    const $router = useRouter()

    const userEmail = computed(() => $store.state.auth.user.email)
    const loggedIn = computed(() => $store.state.auth.status.loggedIn)

    function handleLogout () {
      $store.dispatch('auth/logout')
      $router.push({ name: 'Login' })
    }

    return {
      userEmail,
      loggedIn,
      handleLogout
    }
  },
  components: {
    'account-input-header': require('./Shared/AccountInputHeader').default
  }
}
</script>
