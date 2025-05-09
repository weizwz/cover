'use client'

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { CoverContext } from '../components/coverContext'
import UnsplashSearch from '../components/unsplashSearch'

const StylishTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  return (
    <div className={`h-full overflow-y-hidden flex flex-col`} style={{ backgroundColor: color.bgColor }}>
      <div className='h-full flex flex-row items-center bg-white justify-center'>
        <div className='h-full w-1/2 bg-white rounded-l-xl'>
          <div className={`${font.value} p-12 justify-center text-left rounded-xl h-full flex flex-col`}>
            <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} text-gray-800 font-bold`}>{title}</h1>
            <div className='flex items-center mt-10 text-left'>
              {customIcon ? (
                <div className=' '>
                  <img src={customIcon} alt='img' className='w-12 h-12 mr-2 rounded-full bg-white border border-white' />
                </div>
              ) : (
                <div className='mr-4 items-center justify-center flex'>
                  <img className='w-8 h-8' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
                </div>
              )}
              <h2 className='text-2xl font-semibold text-left text-gray-800'>{author}</h2>
            </div>
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
    </div>
  )
}

export default StylishTheme
