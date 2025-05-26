'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, CirclePlus } from 'lucide-react'
import pcBg from '../assets/images/mobile.webp'

const MobileMockupTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, font, size, theme } = config
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <div className={`overflow-hidden w-full h-full justify-center relative`} style={{ backgroundColor: color.bgColor }}>
      <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />
      <div
        className={`${font.value} h-full flex items-center relative z-10 ${size.value.indexOf('vertical') === 0 ? 'flex-col px-24 py-12' : ''} ${
          size.value.indexOf('vertical') === -1 ? 'px-24' : ''
        }`}>
        <div
          className={`flex-1 ${theme.swapX ? 'order-1' : 'justify-end'} flex flex-col items-center gap-4 text-white text-center ${
            size.value.indexOf('square') === 0 ? 'pl-8' : ''
          }`}>
          <div className={`text-2xl font-semibold text-shadow-sm text-shadow-black ${author.trim() === '' && 'hidden'}`}>{author}</div>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-lg text-shadow-black`}>{title}</div>
        </div>

        <div className={`${size.value.indexOf('horizontal') >= 0 ? 'h-full' : 'w-full'} aspect-[0.5286] group flex flex-col relative`}>
          <img src={pcBg.src} className='absolute top-0 left-0 w-full z-10' alt='background' />
          {image ? (
            // 图片宽高比0.5286  显示区域宽高比0.4498  显示区域宽占总内容区域比0.7297, 高占比0.8575
            <div className='group relative w-full h-full flex'>
              <div className='absolute inset-y-[7.125%] inset-x-[13.515%] w-[72.97%] aspect-[0.4498] overflow-hidden'>
                <img src={image} className={`w-full ${theme.stretchY ? 'h-full' : ''} object-cover object-top`} alt='preview' />
              </div>
              <Button
                className='ignore hidden cursor-pointer absolute z-10 top-0 right-0 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() => setImage(undefined)}>
                <X />
              </Button>
            </div>
          ) : (
            <div className='ignore absolute z-10 inset-y-[7.125%] inset-x-[13.515%] w-[72.97%] aspect-[0.4498] px-4 py-12 flex flex-col items-center'>
              <div className='w-fit rounded-md overflow-hidden mb-4 relative'>
                <Input
                  type='file'
                  accept='image/png, image/jpeg, image/webp'
                  className='cursor-pointer'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
                <div className='absolute top-0 right-0 w-full h-full px-4 flex items-center justify-between bg-white pointer-events-none'>
                  <p className='text-gray-800 whitespace-nowrap'>请选择文件</p>
                  <CirclePlus className='w-5 h-5' />
                </div>
              </div>
              <div className='p-4 text-gray-800 text-sm bg-white/80 rounded-lg shadow-md'>
                <p className='text-left'>友情提示：</p>
                <p className='text-gray-600'>截图宽高比 &gt;=3:2 效果最佳</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMockupTheme
