import React, { useContext } from 'react'
import { ImgContext } from '../../utils/ImgContext'
import UnsplashSearch from '../UnsplashSearch'

const StylishTheme = ({ config }) => {
  const { title, author, font, icon, customIcon, bgColor } = config
  const { unsplashImage, setUnsplashImage } = useContext(ImgContext)

  return (
    <div className={`h-full overflow-y-hidden flex flex-col`} style={{ backgroundColor: bgColor }}>
      <div className='h-full flex flex-row items-center bg-white justify-center'>
        <div className='h-full w-1/2  bg-white rounded-l-xl'>
          <div className={`${font} px-12 justify-center text-left rounded-xl h-full p-4 flex flex-col`}>
            <h1 className=' text-4xl font-bold text-gray-800'>{title}</h1>
            <div className='flex items-center mt-10 text-left'>
              {customIcon ? (
                <div className=' '>
                  <img
                    src={customIcon}
                    alt='img'
                    className='w-12 h-12 mr-2 rounded-full bg-white border border-white'
                  />
                </div>
              ) : (
                <div className='mr-2 items-center justify-center flex'>
                  <img className='w-8 h-8' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
                </div>
              )}
              <h2 className='text-xl  font-semibold text-left '>{author}</h2>
            </div>
          </div>
        </div>
        <div className='w-1/2 h-full'>
          {unsplashImage ? (
            <div className='relative w-full h-full flex group'>
              <img
                src={unsplashImage.url && unsplashImage.url}
                className='object-cover w-full h-full'
                alt='preview'
              />

              <button onClick={() => setUnsplashImage()} className='absolute top-4 right-4 cursor-pointer'>
                <svg
                  className='group-hover:inline-block hidden w-8 h-8 text-gray-800 bg-white p-2 rounded-full z-10'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className='flex w-full h-full flex-col bg-white items-center justify-center'>
              <UnsplashSearch />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StylishTheme
