'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import UnsplashSearch from '../components/unsplashSearch'

const BackgroundTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  return (
    <div className='overflow-y-hidden flex flex-col w-full h-full' style={{ backgroundColor: color.bgColor }}>
      {coverSetting.unsplashImage?.url ? (
        <div className='w-full h-full relative flex group'>
          <div className='h-full w-full'>
            <img src={coverSetting.unsplashImage.url} className='object-cover h-full w-full' alt='preview' />
          </div>

          <div className='h-full absolute top-0 right-0 left-0 p-12'>
            <Button
              className='hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
              variant='outline'
              size='icon'
              onClick={() =>
                setCoverSetting({ ...coverSetting, unsplashImage: { searchText: coverSetting.unsplashImage?.searchText || '', url: '', downloadLink: '' } })
              }>
              <X />
            </Button>

            <div className={`${font.value} text-left rounded-xl h-full flex flex-col justify-center`}>
              {customIcon ? (
                <div className=' '>
                  <img src={customIcon} alt='img' className='w-12 h-12 m-2 rounded-full bg-white border-2 border-white' />
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
                </div>
              )}
              <h1 className={`mt-8 text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-white text-center text-shadow-lg text-shadow-black`}>{title}</h1>
              <div className='flex flex-col items-center mt-6 mb-16'>
                <h2 className='text-2xl  font-semibold text-left text-white text-shadow-sm text-shadow-black'>{author}</h2>
              </div>
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
