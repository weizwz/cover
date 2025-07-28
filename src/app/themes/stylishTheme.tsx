'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const StylishTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, author, icon, font, customIcon, theme } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  // 获取右侧图片
  const getRightImage = () => {
    if (coverSetting.bg.type === 'unsplash' && coverSetting.bg.unsplashUrl) {
      return coverSetting.bg.unsplashUrl
    } else if (coverSetting.bg.type === 'local' && coverSetting.bg.image) {
      return coverSetting.bg.image
    }
    return null
  }

  const rightImage = getRightImage()

  return (
    <div className='w-full h-full overflow-y-hidden flex' style={{ backgroundColor: coverSetting.bg.color }}>
      <div className={`w-1/2 h-full ${font.value} ${theme.swapX ? 'order-1' : ''} p-12 flex flex-col justify-center gap-6 bg-white text-gray-800`}>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold`}>{title}</div>
        <div className='flex items-center gap-4'>
          <img className='w-8 h-8' src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
      <div className='w-1/2 h-full relative' style={{ backgroundColor: coverSetting.bg.color }}>
        {rightImage ? (
          <div className='relative w-full h-full flex group'>
            <img src={rightImage} className='object-cover w-full h-full' alt='preview' />
            <Button
              className='ignore hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
              variant='outline'
              size='icon'
              onClick={() =>
                setCoverSetting({ 
                  ...coverSetting, 
                  bg: { ...coverSetting.bg, type: 'color', image: undefined, unsplashUrl: undefined }
                })
              }>
              <X />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default StylishTheme
