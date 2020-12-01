import dotenv from 'dotenv'

dotenv.config()

export const auth: {
  privateKey: string
  publicKey: string
} = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
}

export const port = Number(process.env.PORT) || 9898
