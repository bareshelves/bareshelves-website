export const refreshServiceWorker = (): void => {
  const path = process.env.NODE_ENV === 'development' ? '/@/scripts/product-sw.ts' : '/_assets/product-sw.js'

  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister())

    navigator.serviceWorker.register(path).then(
      registration => console.log('Service worker registration succeeded:', registration), 
      error => console.log('Service worker registration failed:', error),
    )
  })
}
