'use client'

const OutlineTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon } = config

  return (
    <div className={`w-full h-full text-white relative`} style={{ background: color.bgColor }}>
      <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-50' : ''}`} />
      <div className={`h-full p-24 flex flex-col justify-center`}>
        <div className='items-center flex'>
          {customIcon ? (
            <img className='w-18 h-18' src={customIcon} alt='icon'/>
          ) : (
            <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
          )}
        </div>
        <div className={`${font.value} mb-16 mt-8`}>
          <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-shadow-lg text-shadow-black`}>{title}</h1>
          <h2 className='text-2xl mt-6 font-semibold text-shadow-sm text-shadow-black'>{author}</h2>
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
