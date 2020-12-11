process.on('message', (message) => {
  if (message === 'exit') process.exit()
  console.log(message)
})

process.on('unhandledRejection', console.error)
process.on('uncaughtException', console.error)

// import './router'
import('./utils/db').then(async ({ connectDb }) => {
  try {
    await connectDb()
    await import('./router')
  } catch (error){
    console.error(error)
  }
})
