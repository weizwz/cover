import React from 'react'
const OutlineTheme = ({ config }) => {
  const { title, bgColor, pattern, author, icon, font, customIcon } = config

  return (
    <div className='w-full h-full bg-white'>
      <div className={`overflow-y-hidden text-gray-800 px-10 h-full relative`} style={{ backgroundColor: bgColor }}>
        <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern} filter-opacity-50`} />
        <div className={`${font} h-full rounded-2xl py-6 flex flex-col justify-center relative z-10`}>
          {customIcon ? (
            <div className='m-6'>
              <img src={customIcon} alt='img' className='rounded-full object-cover w-24 h-24 bg-white p-1 border-white' />
            </div>
          ) : (
            <div className='p-2 px-6 items-center flex'>
              <img className='w-24 h-24' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
            </div>
          )}
          <h1 className='text-3xl p-6 text-white md:text-5xl font-bold'>{title}</h1>

          <div className={`${font} w-full flex p-2 px-6 items-center mb-8`}>
            <h2 className='text-2xl text-white font-semibold'>{author}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
