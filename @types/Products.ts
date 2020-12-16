export type ProductSubscription = string[]

export interface Product {
  desc: string
  instock: "false" | "true" | "delayed"
  stock_message: string
  price: number
  productimg: string
  productname: string
  subscription: number
  timestamp: Date
}
