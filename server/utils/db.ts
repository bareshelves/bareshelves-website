// import {
//   config,
// } from '../../config'
// import {
//   MongoClient,
//   MongoClientOptions,
//   Db,
// } from 'mongodb'

// const options: MongoClientOptions = {
//   useUnifiedTopology: true,
// }

// export let db: Db

// export const connectDb = (): Promise<void> => new Promise((resolve, reject) => {
//   console.log('Connecting to database...')

//   MongoClient
//     .connect(config.mongodb.connection, options)
//     .then(client => {
//       db = client.db(config.mongodb.database)
//       resolve()
//     })
//     .catch(reject)
// })

// // eslint-disable-next-line @typescript-eslint/ban-types
// export const convertNestedProps = <T extends object> (props: object): T => {
//   const result = {}

//   for (const key in props) {
//     const chain = key.split('.')

//     let context = result

//     for (const index in chain) {
//       const chainKey = chain[index]

//       if (Number(index) < chain.length - 1) {
//         context[chainKey] = {}
//         context = context[chainKey]
//       } else {
//         context[chainKey] = props[key]
//       }
//     }
//   }

//   return result as T
// }
