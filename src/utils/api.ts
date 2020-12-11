import Axios, {
  AxiosError,
  AxiosResponse,
} from 'axios'

export const api = Axios.create({
  baseURL: `${window.location.origin}/api`,
  withCredentials: true,
})

api.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: AxiosError<string>) => {
  console.error(
    `${error.response.status}: ${error.response.data || error.response.statusText} (${error.request.responseURL})`, 
    '\n\nBODY', error.config.data ? JSON.stringify(JSON.parse(error.config.data), null, 2) : null,
    '\n\nHEADERS', JSON.stringify(error.config.headers, null, 2),
  )

  throw error
})
