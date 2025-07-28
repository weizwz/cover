'use client'

import React, { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Upload, Globe } from 'lucide-react'
import { CoverContext } from './coverContext'
import UnsplashSearch from './unsplashSearch'

const BackgroundSelect = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const backgroundInputRef = useRef<HTMLInputElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // 处理背景图片上传
  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = URL.createObjectURL(e.target.files[0])
      setCoverSetting({ 
        ...coverSetting, 
        bg: { 
          ...coverSetting.bg, 
          image,
          type: 'local',
          unsplashUrl: undefined
        }
      })
    }
  }

  // 处理颜色选择
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverSetting({ 
      ...coverSetting, 
      bg: { 
        color: e.target.value,
        image: undefined,
        type: 'color',
        unsplashUrl: undefined
      }
    })
  }

  // 处理在线图片选择
  const handleUnsplashSelect = () => {
    setDialogOpen(false)
  }

  return (
    <div className='flex-1 flex items-center justify-between gap-2 overflow-hidden'>
      <div className='flex-1 flex items-center gap-2'>
        <Input
          type='color'
          className='w-full focus-visible:ring-1'
          placeholder='请选择背景色'
          value={coverSetting.bg.color}
          onChange={handleColorChange}
        />
      </div>

      <div className='flex gap-1 items-center'>
        {/* 本地上传按钮 */}
        <div className='h-full relative overflow-hidden'>
          <Input
            ref={backgroundInputRef}
            type='file'
            accept='image/png, image/jpeg, image/webp, image/jpg'
            className='absolute h-full w-fit right-0 top-0 opacity-0 cursor-pointer'
            onChange={handleBackgroundImageChange}
          />
          <Button className='cursor-pointer'>
            上传
          </Button>
        </div>

        {/* 在线图片按钮 */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>
              在线
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl max-h-[80vh] overflow-hidden'>
            <DialogHeader>
              <DialogTitle>选择在线背景图片</DialogTitle>
            </DialogHeader>
            <div className='h-[60vh] overflow-auto'>
              <UnsplashSearch 
                largeImgPreview={false} 
                onImageSelect={handleUnsplashSelect}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default BackgroundSelect