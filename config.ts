import dotenv from 'dotenv'
import path from 'path'
import FirestoreServiceConfig from './.google-cloud.json'

dotenv.config({
  path: path.join(__dirname, '.env'),
})

export const auth: {
  privateKey: string
  publicKey: string
} = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
}

export const firestore: FirebaseFirestore.Settings = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: "fir-d1a6f.firebaseapp.com",
  databaseURL: "https://fir-d1a6f.firebaseio.com",
  projectId: "fir-d1a6f",
  storageBucket: "fir-d1a6f.appspot.com",
  messagingSenderId: "234314565490",
  appId: "1:234314565490:web:4a57533a622321f458ffeb",
  measurementId: "G-2MKN99FK1D",
  credentials: FirestoreServiceConfig,
}

export const port = Number(process.env.PORT) || 9898
