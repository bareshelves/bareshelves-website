export type MessageEventOptions = {
  once?: boolean
}

export type SendMessageOptions = {
  persistent?: boolean
}

export type WebsocketEvent = {
  eventName: string
  handler: (event?: Event) => void
  symbol: symbol
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type WebsocketMessage = string | object | number | boolean | WebsocketMessage[]
