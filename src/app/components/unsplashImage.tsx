'use client'

import React, { useState } from 'react'
import { LoaderCircle } from 'lucide-react'

const UnsplashImage: React.FC<UnsplashImageProps> = ({ src, alt, onClick }) => {
  // 使用一个状态变量来跟踪图片是否已经加载完毕
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className='relative w-full h-full'>
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center h-full px-4'>
          <LoaderCircle />
        </div>
      )}
      <img src={src} alt={alt} onLoad={() => setIsLoaded(true)} onClick={onClick} className='rounded-lg object-cover h-full w-full' />
    </div>
  )
}

export default UnsplashImage
