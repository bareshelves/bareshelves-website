import {
  Firestore,
} from '@google-cloud/firestore'
import {
  firestore as firestoreConfig,
} from '../../config'

export const db = new Firestore(firestoreConfig)
