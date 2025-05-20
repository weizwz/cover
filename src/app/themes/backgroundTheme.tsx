'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import UnsplashSearch from '../components/unsplashSearch'

const BackgroundTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, author, icon, font, customIcon } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  return (
    <div className='overflow-hidden flex w-full h-full' style={{ backgroundColor: color.bgColor }}>
      {coverSetting.unsplashImage?.url ? (
        <div className='w-full h-full relative flex group'>
          <img src={coverSetting.unsplashImage.url} className='object-cover h-full w-full' alt='preview' />

          <div className='h-full absolute top-0 right-0 left-0 p-12'>
            <Button
              className='ignore hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
              variant='outline'
              size='icon'
              onClick={() =>
                setCoverSetting({ ...coverSetting, unsplashImage: { searchText: coverSetting.unsplashImage?.searchText || '', url: '', downloadLink: '' } })
              }>
              <X />
            </Button>

            <div className={`${font.value} h-full flex flex-col justify-center gap-6 pb-12 text-center text-white`}>
              <div className='flex items-center justify-center'>
                {customIcon ? (
                  <img className='w-18 h-18' src={customIcon} alt='icon' />
                ) : (
                  <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
                )}
              </div>
              <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-lg text-shadow-black`}>{title}</div>
              <div className='text-2xl font-semibold text-shadow-sm text-shadow-black'>{author}</div>
            </div>
          </div>
        </div>
      ) : (
        <UnsplashSearch largeImgPreview />
      )}
    </div>
  )
}

export default BackgroundTheme
