/* eslint-disable @typescript-eslint/ban-types */

import jwt from 'jsonwebtoken'
import {
  auth,
} from '../../config'

export const sign = <T extends string | Buffer | object> (data: T): string => {
  return jwt.sign(data, auth.privateKey, { algorithm: 'RS256' })
}

export const verify = <T extends string | Buffer | object> (token: string): T => {
  return jwt.verify(token, auth.publicKey) as unknown as T
}
