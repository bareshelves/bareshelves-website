import {
  ObjectId, 
} from "mongodb"

export type ProductSubscription = string[]

export interface Product {
  _id?: ObjectId | string
  desc: string[]
  instock: "false" | "true" | "delayed"
  stock_message: string
  price: number
  productimg: string
  productname: string
  subscription: number
  lastUpdate: Date
  link: string
  // timestamp: Date // commented out so we don't accidentally use this
}

export interface ProductUpdate {
  product: Product
  updatedFields: Product
}
