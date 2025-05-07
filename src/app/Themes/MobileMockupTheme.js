import React, { useState } from 'react'

const MobileMockupTheme = ({ config }) => {
  const { bgColor, pattern, title, font } = config

  const [image, setImage] = useState()

  return (
    <div className={`overflow-y-hidden px-10 w-full h-full justify-center relative`} style={{ backgroundColor: bgColor }}>
      <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern} filter-opacity-50`} />
      <div className={`${font} h-full rounded-2xl flex justify-center items-center relative z-10`}>
        <h1 className={`${font} text-2xl w-1/2 md:text-4xl text-white font-bold text-left`}>{title}</h1>

        <div className='h-[90%] aspect-[0.5286] group flex flex-col relative'>
          <img className='absolute top-0 left-0 h-full z-10' src='./mobile.webp' alt='background' />
          {image ? (
            // 图片宽高比0.5286  显示区域宽高比0.4502  显示区域宽占总内容区域比0.76304,高占比0.8575
            <div className='group relative w-full h-full flex'>

              <div className='absolute t-0 l-0 w-full h-full flex justify-center items-center'>
                <img src={image && image} className='h-[85.75%] aspect-[0.4502] object-cover object-top' alt='preview' />
              </div>
              <button onClick={() => setImage('')} className='ml-auto mr-4 cursor-pointer'>
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
            <div className='absolute top-0 left-[15%] h-full w-[70%] z-20'>
              <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='w-full file-wrapper rounded overflow-hidden mb-4'>
                  <input
                    type='file'
                    className='w-full text-l cursor-pointer p-2 px-4 rounded border bg-white'
                    onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                  />
                </div>
                <span className='text-center'>上传手机截图</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMockupTheme
