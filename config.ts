import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, '../.env'),
})

export const auth: {
  privateKey: string
  publicKey: string
} = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
}

export const mongodb = {
  url: process.env.MONGODB_CONNECTION_URL,
  database: 'amazon',
}

export const vapid: {
  publicKey: string
  privateKey: string
} = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
}

export const port = Number(process.env.PORT) || 9898
