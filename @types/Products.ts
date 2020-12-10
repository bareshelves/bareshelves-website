export type ProductSubscription = string[]

export interface Product {
  desc: string
  instock: "false" | string
  price: number
  productimg: string
  productname: string
  timestamp: Date
}
