import { createApi } from 'unsplash-js'

const key = process.env.REACT_APP_API_ACCESS_KEY

if (!key) {
  throw new Error('REACT_APP_API_ACCESS_KEY is not defined')
}

const unsplash = createApi({
  accessKey: key
})

export default unsplash
