import {
  ProductUpdate, 
} from "../../@types/Products"

const context = self as unknown as ServiceWorkerGlobalScope

if (context.location.pathname.includes('product-sw')) {
  const env = '{{ ENV }}'

  const ws = new WebSocket(env as unknown as string === 'development' ? `ws://localhost:9898/ws` : '/ws')
  
  ws.onopen = () => {
    console.log('Service worker WebSocket client open.')

    ws.send(JSON.stringify({
      eventName: 'subscribe',
      message: {
        name: 'products',
        payload: ['B01GFLZ46W'],
      },
    }))
  }
  
  ws.onmessage = ({ data }) => {
    console.log(data)

    const { eventName, message: update } = JSON.parse(data) as {
      eventName: string
      message: ProductUpdate
    }

    const {
      product,
      updatedFields,
    }  = update
  
    if (eventName === 'product-update') {
      console.log(product, updatedFields)

      const notification = new Notification(`${product.productname} has been updated.`)
      
      notification.addEventListener('click', event => {
        event.preventDefault()
        context.clients.openWindow(`/products/${product._id}`)
      })
    }
  }
}
