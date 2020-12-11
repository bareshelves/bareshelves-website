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

export const port = Number(process.env.PORT) || 9898
