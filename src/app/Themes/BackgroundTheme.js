import React, { useContext } from 'react'
import { ImgContext } from '../../utils/ImgContext'
import UnsplashSearch from '../UnsplashSearch'

const BackgroundTheme = ({ config }) => {
  const { title, author, font, icon, customIcon, bgColor } = config
  const { unsplashImage, setUnsplashImage } = useContext(ImgContext)

  return (
    <div className='overflow-y-hidden flex flex-col w-full h-full' style={{ backgroundColor: bgColor }}>
      {unsplashImage ? (
        <div className='w-full h-full relative flex group'>
          <div className='h-full w-full'>
            <img
              src={unsplashImage.url && unsplashImage.url}
              className='object-cover h-full w-full'
              alt='preview'
            />
          </div>

          <div className='h-full bg-gray-800/60 absolute top-0 right-0 left-0 '>
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

            <div className={`${font} px-10 text-left rounded-xl h-full p-4 flex flex-col justify-center`}>
              <h1 className=' md:text-5xl text-center text-2xl font-bold text-white'>{title}</h1>
              <div className='flex flex-col items-center pt-10'>
                <h2 className='text-xl  font-semibold text-left text-white '>{author}</h2>
                {customIcon ? (
                  <div className=' '>
                    <img
                      src={customIcon}
                      alt='img'
                      className='w-12 h-12 m-2 rounded-full bg-white border-2 border-white'
                    />
                  </div>
                ) : (
                  <div className='mr-2 items-center justify-center flex'>
                    <img className='w-8 h-8' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
                  </div>
                )}
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
