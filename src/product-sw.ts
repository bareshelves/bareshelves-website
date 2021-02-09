import {
  ProductUpdate,
  Product,
} from "../@types"

const context = self as unknown as ServiceWorkerGlobalScope

context.addEventListener('notificationclick', event => {
  const product = event.notification.data.product as Product

  event.preventDefault()
  context.clients.openWindow(`/product/${product._id}`)
})

context.addEventListener('install', () => {
  context.skipWaiting()
})

const showNotification = (update: ProductUpdate) => {
  const {
    product,
    // updatedFields,
  } = update

  console.log('Update for:', update.product, update.updatedFields)

  if (product.instock === 'false') return

  const title = 'Product back in stock'
  const body = product.productname.length > 34 ? product.productname.substr(0, 34) + '...' : product.productname

  if (context.registration?.active && context.registration?.showNotification) {
    context.registration.showNotification(title, {
      data: {
        product,
      },

      icon: product.productimg,
      body,
    })
  } else {
    const notification = new Notification(title, {
      icon: product.productimg,
      body,
    })
    
    notification.addEventListener('click', event => {
      event.preventDefault()
      context.clients.openWindow(`/products/${product._id}`)
    })
  }
}

context.addEventListener('push', event => {
  showNotification(event.data.json())
})
