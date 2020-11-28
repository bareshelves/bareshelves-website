/* eslint-disable @typescript-eslint/ban-types */

import jwt from 'jsonwebtoken'
import config from '../../config.js'

export const sign = <T extends string | Buffer | object> (data: T): string => {
  return jwt.sign(data, config.auth.privateKey, { algorithm: 'RS256' })
}

export const verify = <T extends string | Buffer | object> (token: string): T => {
  return jwt.verify(token, config.auth.publicKey) as unknown as T
}
