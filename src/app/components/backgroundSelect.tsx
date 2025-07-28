'use client'

import React, { useContext, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CoverContext } from './coverContext'

const BackgroundSelect = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const backgroundInputRef = useRef<HTMLInputElement>(null)

  // 处理背景图片上传
  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const bgImage = URL.createObjectURL(e.target.files[0])
      setCoverSetting({ 
        ...coverSetting, 
        color: { 
          ...coverSetting.color, 
          bgImage 
        } 
      })
    }
  }

  // 处理颜色选择
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverSetting({ 
      ...coverSetting, 
      color: { 
        bgColor: e.target.value,
        bgImage: '' // 选择颜色时清空背景图片
      } 
    })
  }

  return (
    <div className='flex-1 flex items-center justify-between gap-2 overflow-hidden'>
      <Input
        type='color'
        className='flex-1 focus-visible:ring-1'
        placeholder='请选择背景色'
        value={coverSetting.color.bgColor}
        onChange={handleColorChange}
      />

      <div className='h-full w-15 relative overflow-hidden'>
        <Input
          ref={backgroundInputRef}
          type='file'
          accept='image/png, image/jpeg, image/webp, image/jpg'
          className='absolute h-full w-fit right-0 top-0 opacity-0 cursor-pointer'
          onChange={handleBackgroundImageChange}
        />
        <Button className='cursor-pointer pointer-events-none'>上传</Button>
      </div>
    </div>
  )
}

export default BackgroundSelect