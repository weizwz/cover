'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import pcBg from '../assets/images/pc.webp'

const PreviewTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, font, size } = config
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden relative`} style={{ backgroundColor: color.bgColor }}>
      <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern.value} ${pattern.isOpacity ? 'opacity-50' : ''}`} />
      <div
        className={`${font.value} h-full flex flex-col items-center ${
          size.value.indexOf('vertical') >= 0 ? 'justify-center' : ''
        } relative z-10 p-12 text-center`}>
        <h2 className='text-2xl mb-2 font-semibold text-white text-shadow-sm text-shadow-black'>{author}</h2>
        <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-white text-shadow-lg text-shadow-black`}>{title}</h1>

        <div className='w-full aspect-[1.5382] group flex flex-col relative'>
          <img src={pcBg.src} className='absolute top-0 left-0 w-full z-10' alt='background' />

          {image ? (
            // 图片宽高比1.5382 显示区域宽高比1.5397  显示区域宽占总内容区域比0.7667
            <div className='relative w-full h-full flex'>
              <div className='absolute inset-y-[11.64%] inset-x-[11.62%] w-[76.76%] aspect-[1.5397] overflow-hidden'>
                <img src={image} className='w-full object-cover object-top' alt='preview' />
              </div>
              <Button
                className='hidden cursor-pointer absolute z-10 top-4 right-4 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() => setImage(undefined)}>
                <X />
              </Button>
            </div>
          ) : (
            <div className='absolute z-10 inset-y-[11.58%] inset-x-[11.66%] w-[76.68%] aspect-[1.5397] px-4 py-12 flex flex-col items-center'>
              <div className='w-fit rounded overflow-hidden mb-4'>
                <Input
                  type='file'
                  accept='image/png, image/jpeg, image/webp'
                  className='cursor-pointer bg-white'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </div>
              <span className='text-center text-gray-800'>上传PC截图</span>
              <span className='text-center text-gray-600 text-sm'>截图宽高比&gt;=3:2效果最佳</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewTheme
