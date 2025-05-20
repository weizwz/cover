'use client'

const OutlineTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon } = config

  return (
    <div className={`w-full h-full text-white relative`} style={{ background: color.bgColor }}>
      <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />
      <div className={`w-full h-full p-24 pb-36 flex flex-col gap-6 justify-center relative z-10`}>
        <div className='items-center flex'>
          {customIcon ? (
            <img className='w-18 h-18' src={customIcon} alt='icon' />
          ) : (
            <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
          )}
        </div>
        <div className={`${font.value} flex flex-col gap-6`}>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-lg text-shadow-black`}>{title}</div>
          <div className='text-2xl font-semibold text-shadow-sm text-shadow-black'>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
