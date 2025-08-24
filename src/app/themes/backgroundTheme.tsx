'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, hasBackgroundImage, shouldShowPattern } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BackgroundTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, author, icon, font, customIcon, pattern } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const hasImage = hasBackgroundImage(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className='overflow-hidden flex w-full h-full' style={backgroundStyle}>
      {hasImage ? (
        <div className='w-full h-full relative flex group'>
          <div className='h-full absolute top-0 right-0 left-0 p-12'>
            {coverSetting.bg.type === 'unsplash' && (
              <Button
                className='ignore hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
                variant='outline'
                size='icon'
                onClick={() =>
                  setCoverSetting({ 
                    ...coverSetting, 
                    bg: { ...coverSetting.bg, type: 'color', unsplashUrl: undefined }
                  })
                }>
                <X />
              </Button>
            )}

            <div className={`${font.value} h-full flex flex-col justify-center gap-6 pb-10 text-center text-white`}>
              <div className='flex items-center justify-center'>
                <img className='w-18 h-18' src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
              </div>
              <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-lg text-shadow-black`}>{title}</div>
              <div className={`text-2xl font-semibold text-shadow-sm text-shadow-black ${author.trim() === '' && 'hidden'}`}>{author}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${font.value} realtive w-full h-full flex flex-col justify-center gap-6 p-12 pb-22 text-center text-white`}>
          {showPattern && <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
          <div className='flex items-center justify-center'>
            <img className='w-18 h-18' src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
          </div>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-lg text-shadow-black`}>{title}</div>
          <div className={`text-2xl font-semibold text-shadow-sm text-shadow-black ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      )}
    </div>
  )
}

export default BackgroundTheme
