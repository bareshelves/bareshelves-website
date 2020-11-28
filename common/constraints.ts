import * as regex from './regex'

export const testValidUsername = (username: string): boolean => (
  typeof username === 'string' &&
  regex.username.test(username) &&
  username.length <= 50 &&
  username.length >= 2
)

export const testValidEmail = (email: string): boolean => (
  typeof email === 'string' &&
  regex.email.test(email) &&
  email.length <= 100
)

export const testValidPassword = (password: string): boolean => (
  typeof password === 'string' &&
  regex.password.test(password) &&
  password.length >= 6 &&
  password.length <= 2048
)
