'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import UnsplashSearch from '../components/unsplashSearch'

const StylishTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, author, icon, font, customIcon } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  return (
    <div className='w-full h-full overflow-y-hidden flex' style={{ backgroundColor: color.bgColor }}>
      <div className={`w-1/2 h-full ${font.value} p-12 flex flex-col justify-center gap-6 bg-white text-gray-800`}>
        <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold`}>{title}</h1>
        <div className='flex items-center gap-4'>
          <div className='items-center justify-center flex'>
            {customIcon ? (
              <img className='w-8 h-8' src={customIcon} alt='icon' />
            ) : (
              <img className='w-8 h-8' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
            )}
          </div>
          <h2 className='text-2xl font-semibold'>{author}</h2>
        </div>
      </div>
      <div className='w-1/2 h-full'>
        {coverSetting.unsplashImage?.url ? (
          <div className='relative w-full h-full flex group'>
            <img src={coverSetting.unsplashImage.url} className='object-cover w-full h-full' alt='preview' />
            <Button
              className='hidden cursor-pointer absolute top-4 right-4 rounded-full text-center group-hover:flex'
              variant='outline'
              size='icon'
              onClick={() =>
                setCoverSetting({ ...coverSetting, unsplashImage: { searchText: coverSetting.unsplashImage?.searchText || '', url: '', downloadLink: '' } })
              }>
              <X />
            </Button>
          </div>
        ) : (
          <div className='flex w-full h-full flex-col bg-white items-center justify-center'>
            <UnsplashSearch largeImgPreview={false} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StylishTheme
