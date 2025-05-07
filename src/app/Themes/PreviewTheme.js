import React, { useState } from 'react'

const PreviewTheme = ({ config }) => {
  const { bgColor, pattern, title, font } = config

  const [image, setImage] = useState()

  return (
    <div className='w-full h-full bg-white'>
      <div className={`overflow-y-hidden flex flex-col w-full h-full relative`} style={{ backgroundColor: bgColor }}>
        <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern} filter-opacity-50`} />
        <div className={`${font} h-full rounded-2xl flex flex-col items-center justify-center relative z-10`}>
          <h1 className={`${font} text-2xl pt-8 md:text-3xl text-white font-bold`}>{title}</h1>

          <div className='w-2/3 aspect-[1.5382] group flex flex-col relative'>
            <img className='absolute top-0 left-0 w-full z-10' src='./pc.webp' alt='background' />

            {image ? (
              // 图片宽高比1.5382 显示区域宽高比1.5397  显示区域宽占总内容区域比0.7667
              <div className='relative w-full h-full flex'>
                <div className='absolute t-0 l-0 w-full h-full flex justify-center items-center'>
                  <img src={image && image} className='w-[76.67%] aspect-[1.5397] object-cover object-top' alt='preview' />
                </div>
                <button onClick={() => setImage('')} className='ml-auto mr-4 cursor-pointer w-0'>
                  <svg
                    className='group-hover:inline-block absolute top-4 right-2 bg-gray-500 hidden w-8 h-8 p-2 text-white rounded-full z-10'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className='absolute top-0 left-0 h-full w-full z-20 p-10'>
                <div className='h-full flex flex-col px-4 py-20 items-center justify-center'>
                  <div className='file-wrapper rounded overflow-hidden mb-4'>
                    <input
                      type='file'
                      className='text-l cursor-pointer p-2 px-4 rounded border bg-white'
                      onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                    />
                  </div>
                  <span className='text-center'>上传PC截图</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewTheme
