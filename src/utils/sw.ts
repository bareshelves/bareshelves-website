export const refreshServiceWorker = (): void => {
  const path = process.env.NODE_ENV === 'development' ? '/@/product-sw.ts' : '/_assets/product-sw.js'

  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister())

    navigator.serviceWorker.register(path).then(
      registration => {
        console.log('Service worker registration succeeded:', registration)
      },

      error => console.log('Service worker registration failed:', error),
    )
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
navigator.serviceWorker.ready.then(async registration => {
  try {
    registration.periodicSync.unregister('bareshelves-notifications')

    console.log('registering periodic sync')

    const syncRegisitration = await registration.periodicSync.register('bareshelves-notifications', {
      minInterval: 3600000, // 1 hour
    })

    console.log(syncRegisitration)
  } catch {
    console.log('Periodic Sync could not be registered!')
  }
}).catch(console.error)
