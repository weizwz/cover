'use client'

// 格式化日期
export const getFormattedDateTime = () => {
  const now = new Date()
  return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now
    .getHours()
    .toString()
    .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`
}

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

// 节流
export const throttle = <T extends (...args: never[]) => void>(fn: T, wait: number): T => {
  let lastCall = 0
  return ((...args: Parameters<T>): void => {
    const now = new Date().getTime()
    if (now - lastCall >= wait) {
      fn(...args)
      lastCall = now
    }
  }) as unknown as T
}
