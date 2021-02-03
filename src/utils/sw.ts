import {
  SubscriptionInterface, 
} from "@types"
import {
  api, 
} from "./api"

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  
  return outputArray
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const refreshServiceWorker = (): void => {
  const path = process.env.NODE_ENV === 'development' ? '/@/product-sw.ts' : '/_assets/product-sw.js'

  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister())

    navigator.serviceWorker.register(path).then(
      async registration => {
        console.log('Service worker registration succeeded:', registration)
        
        try {
          const { data: vapidPublicKey } = await api.get<string>('/push/vapid-public-key')
    
          localStorage.id = localStorage.id || (String(Math.random()).replace('.', '') + String(Date.now()))
  
          const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          })
  
          const body: SubscriptionInterface = {
            id: localStorage.id,
            subscription: JSON.parse(JSON.stringify((pushSubscription))),
          }
    
          await api.post('/push/new-subscription', body)

          console.log('Push subscription succeeded:', body)
        } catch (error) {
          console.error(error)
          console.error('Push subscription failed.')
        }
      },

      error => console.log('Service worker registration failed:', error),
    )
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// navigator.serviceWorker.ready.then(async registration => {
//   console.log('service worker ready')

//   try {
//     registration.periodicSync.unregister('bareshelves-notifications')

//     console.log('registering periodic sync')

//     const syncRegisitration = await registration.periodicSync.register('bareshelves-notifications', {
//       minInterval: 3600000, // 1 hour
//     })

//     console.log(syncRegisitration)
//   } catch {
//     console.log('Periodic Sync could not be registered!')
//   }
// }).catch(console.error)
