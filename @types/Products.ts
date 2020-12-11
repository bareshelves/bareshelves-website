export type ProductSubscription = string[]

export interface Product {
  desc: string
  instock: "false" | "true" | "delayed"
  price: number
  productimg: string
  productname: string
  timestamp: Date
}
