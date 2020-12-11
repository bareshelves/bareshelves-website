import {
  WebsocketClient,
} from '../../common/ws'

// export const ws = new WebsocketClient(`${window.location.protocol.includes('https:') ? 'wss' : 'ws'}://${window.location.host}/ws`)
export const ws = new WebsocketClient(`ws://localhost:9898/ws`) // TODO: proxy ws

ws.onOpen(() => console.log('Established WebSocket connection.'))

ws.onError(console.error)
ws.onEvent('error', console.error)

ws.onMessage(console.log)

window['ws'] = ws
