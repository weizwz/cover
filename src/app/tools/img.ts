// 图片转base64
export const imgToBase64 = (url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        const reader = new FileReader()
        reader.readAsDataURL(xhr.response)
        reader.onload = () => {
          if (reader.result) {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1])
            } else {
              reject(new Error('Failed to read file: result is not a string'))
            }
          } else {
            reject(new Error('Failed to read file: result is null'))
          }
        }
        reader.onerror = (error) => reject(error)
      } else {
        reject(new Error(`Failed to load image file: ${xhr.status}`))
      }
    }
    xhr.onerror = (error) => reject(error)
    xhr.send()
  })
}
