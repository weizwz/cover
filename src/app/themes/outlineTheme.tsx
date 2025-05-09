'use client'

const OutlineTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config

  return (
    <div className='w-full h-full bg-white'>
      <div className={`overflow-y-hidden text-gray-800 px-10 h-full relative`} style={{ backgroundColor: color.bgColor }}>
        <div className={`absolute top-0 left-0 w-full h-full z-1 ${pattern.value} filter-opacity-50`} />
        <div className={`h-full rounded-2xl p-12 flex flex-col justify-center relative z-10`}>
          {customIcon ? (
            <div className='m-6'>
              <img src={customIcon} alt='img' className='rounded-full object-cover w-24 h-24 bg-white p-1 border-white' />
            </div>
          ) : (
            <div className='items-center flex'>
              <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
            </div>
          )}
          <div className={`${font.value} mb-16 mt-8`}>
            <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-white text-shadow-lg text-shadow-black`}>{title}</h1>
            <h2 className='text-2xl mt-4 font-semibold text-white text-shadow-sm text-shadow-black'>{author}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
