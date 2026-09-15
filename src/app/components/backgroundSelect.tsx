'use client'

import React, { useContext, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Blend, Globe, ImageUp, Palette } from 'lucide-react'
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
    <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
      <div className="flex flex-1 items-center gap-2">
        <Input
          type="color"
          className="w-full bg-indigo-50/50 focus-visible:ring-1"
          placeholder="请选择背景色"
          value={coverSetting.bg.color}
          onChange={handleColorChange}
        />
      </div>

      <div className="flex items-center gap-1">
        {/* 渐变色按钮 */}
        <Dialog open={gradientDialogOpen} onOpenChange={setGradientDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Blend className="hidden h-4 w-4 md:block" />
              渐变
            </Button>
          </DialogTrigger>
          <DialogContent className="flex max-h-[90vh] w-[90vw] max-w-4xl! flex-col overflow-hidden bg-linear-to-br from-white to-gray-50">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-pink-500 to-violet-600">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                选择渐变色背景
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">精选渐变色彩，让你的封面更加生动</p>
            </DialogHeader>
            <GradientSelect onGradientSelect={handleGradientSelect} />
          </DialogContent>
        </Dialog>

        {/* 在线图片按钮 */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Globe className="hidden h-4 w-4 md:block" />
              在线
            </Button>
          </DialogTrigger>
          <DialogContent className="flex max-h-[90vh] w-[90vw] max-w-4xl! flex-col overflow-hidden bg-linear-to-br from-white to-gray-50">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                选择在线背景图片
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">
                从{' '}
                <a className="text-primary" href="https://unsplash.com/" target="_blank">
                  Unsplash
                </a>{' '}
                精选高质量图片作为封面背景
              </p>
            </DialogHeader>
            <UnsplashSearch largeImgPreview={true} onImageSelect={handleUnsplashSelect} />
          </DialogContent>
        </Dialog>

        {/* 本地上传按钮 */}
        <div className="relative h-full overflow-hidden">
          <Input
            ref={backgroundInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            className="absolute top-0 right-0 h-full w-fit cursor-pointer opacity-0"
            onChange={handleBackgroundImageChange}
          />
          <Button className="cursor-pointer">
            <ImageUp className="hidden h-4 w-4 md:block" />
            上传
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BackgroundSelect
