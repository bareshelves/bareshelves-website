export interface Config {
  port: number

  auth?: {
    privateKey: string
    publicKey: string
  }

  mongodb?: {
    connection: string
    database: string
  }
}

export interface Meta {
  title: string
  description: string
  thumbnail: string
  themeColor: string
  url: string
}
