'use client'

import React, { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Globe, Palette } from 'lucide-react'
import { CoverContext } from './coverContext'
import UnsplashSearch from './unsplashSearch'
import GradientSelect from './gradientSelect'

const BackgroundSelect = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const backgroundInputRef = useRef<HTMLInputElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [gradientDialogOpen, setGradientDialogOpen] = useState(false)

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
        unsplashUrl: undefined,
        gradient: undefined
      }
    })
  }

  // 处理在线图片选择
  const handleUnsplashSelect = () => {
    setDialogOpen(false)
  }

  // 处理渐变色选择
  const handleGradientSelect = () => {
    setGradientDialogOpen(false)
  }

  return (
    <div className='flex-1 flex items-center justify-between gap-2 overflow-hidden'>
      <div className='flex-1 flex items-center gap-2'>
        <Input type='color' className='w-full focus-visible:ring-1' placeholder='请选择背景色' value={coverSetting.bg.color} onChange={handleColorChange} />
      </div>

      <div className='flex gap-1 items-center'>
        {/* 渐变色按钮 */}
        <Dialog open={gradientDialogOpen} onOpenChange={setGradientDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>渐变</Button>
          </DialogTrigger>
          <DialogContent className='max-w-7xl w-[90vw] max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50'>
            <DialogHeader className='border-b border-gray-100 pb-4'>
              <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg flex items-center justify-center'>
                  <Palette className='w-4 h-4 text-white' />
                </div>
                选择渐变色背景
              </DialogTitle>
              <p className='text-sm text-gray-600 mt-2'>精选渐变色彩，让你的封面更加生动</p>
            </DialogHeader>
            <GradientSelect onGradientSelect={handleGradientSelect} />
          </DialogContent>
        </Dialog>

        {/* 本地上传按钮 */}
        <div className='h-full relative overflow-hidden'>
          <Input
            ref={backgroundInputRef}
            type='file'
            accept='image/png, image/jpeg, image/webp, image/jpg'
            className='absolute h-full w-fit right-0 top-0 opacity-0 cursor-pointer'
            onChange={handleBackgroundImageChange}
          />
          <Button className='cursor-pointer'>上传</Button>
        </div>

        {/* 在线图片按钮 */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>在线</Button>
          </DialogTrigger>
          <DialogContent className='max-w-7xl w-[90vw] max-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-br from-white to-gray-50'>
            <DialogHeader className='border-b border-gray-100 pb-4'>
              <DialogTitle className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <Globe className='w-4 h-4 text-white' />
                </div>
                选择在线背景图片
              </DialogTitle>
              <p className='text-sm text-gray-600 mt-2'>从 Unsplash 精选高质量图片作为封面背景</p>
            </DialogHeader>
            <UnsplashSearch largeImgPreview={true} onImageSelect={handleUnsplashSelect} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default BackgroundSelect
