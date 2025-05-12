'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import pcBg from '../assets/images/mobile.webp'

const MobileMockupTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <div className={`overflow-y-hidden w-full h-full justify-center relative`} style={{ backgroundColor: color.bgColor }}>
      <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern.value} ${pattern.isOpacity ? 'filter-opacity-50' : ''}`} />
      <div
        className={`${font.value} h-full rounded-2xl flex items-center relative z-10 ${size.value.indexOf('vertical') === 0 ? 'flex-col px-24 py-12' : ''} ${
          size.value.indexOf('vertical') === -1 ? 'px-24' : ''
        }`}>
        <div className='flex-1 flex flex-col justify-end items-center'>
          <h2 className='text-2xl mb-2 font-semibold text-white text-shadow-sm text-shadow-black'>{author}</h2>
          <h1
            className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-white text-center text-shadow-lg text-shadow-black ${
              size.value.indexOf('square') === 0 ? 'pl-8' : ''
            }`}>
            {title}
          </h1>
        </div>

        <div className={`${size.value.indexOf('horizontal') >= 0 ? 'h-full' : 'w-full'} aspect-[0.5286] group flex flex-col relative`}>
          <img src={pcBg.src} className='absolute top-0 left-0 w-full z-10' alt='background' />
          {image ? (
            // 图片宽高比0.5286  显示区域宽高比0.4498  显示区域宽占总内容区域比0.7297, 高占比0.8575
            <div className='group relative w-full h-full flex'>
              <div className='absolute inset-y-[7.125%] inset-x-[13.515%] w-[72.97%] aspect-[0.4498] overflow-hidden'>
                <img src={image} className='w-full object-cover object-top' alt='preview' />
              </div>
              <Button
                className='hidden cursor-pointer absolute z-10 top-0 right-0 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() => setImage(undefined)}>
                <X />
              </Button>
            </div>
          ) : (
            <div className='absolute z-10 inset-y-[7.125%] inset-x-[13.515%] w-[72.97%] aspect-[0.4498] px-4 py-12 flex flex-col items-center'>
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
              <span className='text-center'>上传手机截图</span>
              <span className='text-center text-gray-600 text-sm'>截图高宽比&gt;=11:5效果最佳</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMockupTheme
