import dotenv from 'dotenv'

dotenv.config()

export const auth: {
  privateKey: string
  publicKey: string
} = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
}

export const firestore = {
  apiKey: "AIzaSyC69erHUXfcpQVa4x7Kz9ZN0WggQ7V8A_E",
  authDomain: "fir-d1a6f.firebaseapp.com",
  databaseURL: "https://fir-d1a6f.firebaseio.com",
  projectId: "fir-d1a6f",
  storageBucket: "fir-d1a6f.appspot.com",
  messagingSenderId: "234314565490",
  appId: "1:234314565490:web:4a57533a622321f458ffeb",
  measurementId: "G-2MKN99FK1D",
}

export const port = Number(process.env.PORT) || 9898
