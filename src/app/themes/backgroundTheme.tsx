'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, hasBackgroundImage, shouldShowPattern, getBlurScale } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BackgroundTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, author, icon, font, customIcon, pattern, bgBlur, bgGrayscale } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const hasImage = hasBackgroundImage(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)
  const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className="flex h-full w-full overflow-hidden" style={backgroundStyle}>
      {hasImage ? (
        <div className="group relative flex h-full w-full">
          <div
            className="absolute top-0 right-0 left-0 h-full p-12"
            style={{
              backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
            }}
          >
            {coverSetting.bg.type === 'unsplash' && (
              <Button
                className="ignore absolute top-4 right-4 hidden cursor-pointer rounded-full text-center group-hover:flex"
                variant="outline"
                size="icon"
                onClick={() =>
                  setCoverSetting({
                    ...coverSetting,
                    bg: { ...coverSetting.bg, type: 'color', unsplashUrl: undefined }
                  })
                }
              >
                <X />
              </Button>
            )}

            <div className={`${font.value} flex h-full flex-col justify-center gap-6 pb-10 text-center text-white`}>
              <div className="flex items-center justify-center">
                <img className="h-18 w-18" src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
              </div>
              <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-black text-shadow-lg`}>{title}</div>
              <div className={`text-2xl font-semibold text-shadow-black text-shadow-sm ${author.trim() === '' && 'hidden'}`}>{author}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${font.value} relative h-full w-full p-24 pb-34 text-center text-white`}>
          {showPattern && <div className={`absolute top-0 left-0 z-1 h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
          {(bgBlur > 0 || bgGrayscale > 0) && (
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{
                backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
              }}
            />
          )}
          <div className={`relative z-10 flex h-full flex-col justify-center gap-6`}>
            <div className="flex items-center justify-center">
              <img className="h-18 w-18" src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
            </div>
            <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-black text-shadow-lg`}>{title}</div>
            <div className={`text-2xl font-semibold text-shadow-black text-shadow-sm ${author.trim() === '' && 'hidden'}`}>{author}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundTheme
