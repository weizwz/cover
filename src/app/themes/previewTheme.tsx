'use client'

import React, { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, CirclePlus } from 'lucide-react'
import pcBg from '../assets/images/pc.webp'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern, getBlurScale } from '../tools/backgroundUtils'

const PreviewTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, font, size, theme, bgBlur, bgGrayscale } = config
  const { coverSetting } = useContext(CoverContext)
  const [image, setImage] = useState<string | undefined>(undefined)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)
  const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className={`relative flex h-full w-full flex-col overflow-hidden`} style={backgroundStyle}>
      {showPattern && <div className={`absolute top-0 left-0 z-1 h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      {(bgBlur > 0 || bgGrayscale > 0) && (
        <div
          className="absolute h-full w-full"
          style={{
            backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
          }}
        />
      )}
      <div
        className={`${font.value} flex h-full flex-col items-center ${
          size.value.indexOf('vertical') >= 0 ? 'justify-center' : ''
        } relative z-10 p-16 text-center`}
      >
        <div className={`mb-2 text-2xl font-semibold text-white text-shadow-black text-shadow-sm ${author.trim() === '' && 'hidden'}`}>{author}</div>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-white text-shadow-black text-shadow-lg`}>{title}</div>

        <div className="group relative flex aspect-[1.5382] w-full flex-col">
          <img src={pcBg.src} className="absolute top-0 left-0 z-10 w-full" alt="background" />

          {image ? (
            // 图片宽高比1.5382 显示区域宽高比1.5397  显示区域宽占总内容区域比0.7667
            <div className="relative flex h-full w-full">
              <div className="absolute inset-x-[11.62%] inset-y-[11.64%] aspect-[1.5397] w-[76.76%] overflow-hidden">
                <img src={image} className={`w-full object-cover object-top`} alt="preview" style={{ height: theme.stretchY ? '100%' : '' }} />
              </div>
              <Button
                className="ignore absolute top-4 right-4 z-10 hidden cursor-pointer rounded-full text-center group-hover:flex"
                variant="outline"
                size="icon"
                onClick={() => setImage(undefined)}
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className="ignore absolute inset-x-[11.66%] inset-y-[11.58%] z-10 flex aspect-[1.5397] w-[76.68%] flex-col items-center px-4 py-12">
              <div className="relative mb-4 w-fit overflow-hidden rounded-md">
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="cursor-pointer bg-white/80"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
                <div className="pointer-events-none absolute top-0 right-0 flex h-full w-full items-center justify-between bg-white px-4">
                  <p className="whitespace-nowrap text-gray-800">请选择文件</p>
                  <CirclePlus className="h-5 w-5" />
                </div>
              </div>
              <div className="rounded-lg bg-white/80 p-4 text-sm text-gray-800 shadow-md">
                <p className="text-left">友情提示：</p>
                <p className="text-gray-600">截图宽高比 &gt;=3:2 效果最佳</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewTheme
