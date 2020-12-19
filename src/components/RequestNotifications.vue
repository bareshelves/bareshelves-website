<template lang="pug">
.notifications( v-if="!granted" )
  .box
    h3 {{ message }}
    button( v-if="granted === null" @click="request" )
      BellIcon 
      | Request permission
</template>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  // border-top: 1px solid var(--text);
  background-color: white;
  box-shadow: 0 -2rem 3rem 1rem rgba(black, 0.05);

  .box {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    justify-content: center;
  }

  h3 {
    max-width: 60%;
  }

  button {
    margin-left: auto;
    font-size: 1rem;
    padding-bottom: 1rem;

    svg {
      width: 1.5rem;
      transform: translateY(0.1rem);
      margin-right: 0.3rem;
    }
  }
}
</style>

<script lang="ts">
import {
  computed,
  defineComponent, 
} from "vue"
import {
  getNotificationGranted,
  requestNotificationPermission,
  notify,
} from "../utils"
import BellIcon from '../assets/svg/bell.svg'
import {
  useStore, 
} from "vuex"
import {
  state, 
} from "../store/plugins"

const RequestNotifications = defineComponent({
  components: {
    BellIcon,
  },

  setup () {
    const store = useStore<state>()

    const granted = computed(() => {
      return store.state.notifications.granted
    })

    const request = () => {
      requestNotificationPermission()
        .then(() => store.commit('updateGrantedState'))
        .catch(console.error)
    }

    const message = computed(() => {
      if (granted.value === null) return `Notifications are required to receive updates for products you're following.`
      if (granted.value === false) return `You've blocked notifications. Please re-enable them to receive updates.`
      if (granted.value === true) return `You've enabled notifications!`
    })

    return {
      granted,
      request,
      message,
    }
  },
})

export default RequestNotifications
</script>
