'use client'

import React, { useState } from 'react'
import { LoaderCircle } from 'lucide-react'

const UnsplashImage: React.FC<UnsplashImageProps> = ({ src, alt, user, links }) => {
  // 使用一个状态变量来跟踪图片是否已经加载完毕
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className='relative w-full h-full'>
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center h-full px-4'>
          <LoaderCircle />
        </div>
      )}
      <img src={src} alt={alt} onLoad={() => setIsLoaded(true)} className='rounded-lg object-cover h-full w-full' />
      <div className='absolute bottom-1 w-full px-2 text-xs flex flex-col items-end justify-center'>
        <a className=' text-white mb-0.5' href={links.html}>Unsplash</a>
        <a className="cursor-pointer flex items-center bg-gray-100 rounded-full px-1 py-0.5" href={user.links.html}>
          <img className='h-4 w-4 rounded-full mr-1' src={user.profile_image.medium} alt={user.username} />
          <span className='flex-1 pr-2 overflow-hidden text-ellipsis text-nowrap'>{user.username}</span>
        </a>
      </div>
    </div>
  )
}

export default UnsplashImage
