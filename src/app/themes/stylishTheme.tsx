'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import { getBlurScale } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const StylishTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, author, icon, font, customIcon, theme, pattern, bgBlur, bgGrayscale } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  // 获取右侧背景样式
  const getRightBackgroundStyle = () => {
    if (coverSetting.bg.type === 'unsplash' && coverSetting.bg.unsplashUrl) {
      return {
        backgroundImage: `url(${coverSetting.bg.unsplashUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    } else if (coverSetting.bg.type === 'local' && coverSetting.bg.image) {
      return {
        backgroundImage: `url(${coverSetting.bg.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    } else if (coverSetting.bg.type === 'gradient' && coverSetting.bg.gradient) {
      return {
        background: coverSetting.bg.gradient
      }
    } else {
      return {
        backgroundColor: coverSetting.bg.color
      }
    }
  }

  // 检查是否有图片内容
  const hasImageContent = () => {
    return (coverSetting.bg.type === 'unsplash' && coverSetting.bg.unsplashUrl) || (coverSetting.bg.type === 'local' && coverSetting.bg.image)
  }

  const rightBackgroundStyle = getRightBackgroundStyle()
  const hasImage = hasImageContent()
  const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className="flex h-full w-full overflow-y-hidden" style={{ backgroundColor: coverSetting.bg.color }}>
      <div className={`h-full w-1/2 p-12 ${font.value} ${theme.swapX ? 'order-1 pr-14' : 'pl-14'} flex flex-col justify-center gap-6 bg-white text-gray-800`}>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold`}>{title}</div>
        <div className="flex items-center gap-4">
          <img className="h-8 w-8" src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
      <div className="relative h-full w-1/2" style={rightBackgroundStyle}>
        {(coverSetting.bg.type === 'color' || (coverSetting.bg.type === 'gradient' && coverSetting.bg.gradient)) && (
          <div className={`absolute top-0 left-0 z-1 h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />
        )}
        {(bgBlur > 0 || bgGrayscale > 0) && (
          <div
            className="absolute h-full w-full"
            style={{
              backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
            }}
          />
        )}

        {hasImage && (
          <div className="group relative flex h-full w-full">
            <Button
              className="ignore absolute top-4 right-4 hidden cursor-pointer rounded-full text-center group-hover:flex"
              variant="outline"
              size="icon"
              onClick={() =>
                setCoverSetting({
                  ...coverSetting,
                  bg: { ...coverSetting.bg, type: 'color', image: undefined, unsplashUrl: undefined, gradient: undefined }
                })
              }
            >
              <X />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StylishTheme
