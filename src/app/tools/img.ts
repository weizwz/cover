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
              reject(new Error('图片转base64失败'))
            }
          } else {
            reject(new Error('图片为空'))
          }
        }
        reader.onerror = (error) => reject(error)
      } else {
        reject(new Error(`图片加载失败: ${xhr.status}`))
      }
    }
    xhr.onerror = (error) => reject(error)
    xhr.send()
  })
}

// base64转blob
export const base64ToBlob = (base64: string): Blob => {
  // 解码Base64字符串
  const byteString = atob(base64.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: 'image/png' })
}
