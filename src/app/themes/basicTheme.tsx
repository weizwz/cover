'use client'

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon } = config

  return (
    <div className={`flex text-gray-800 justify-center items-center h-full p-12 relative`} style={{ backgroundColor: color.bgColor }}>
      <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-50' : ''}`} />
      <div
        className={`w-full h-full max-h-[360px] max-w-[640px] flex flex-col justify-center items-center gap-6 p-12 ${font.value} bg-white rounded-2xl relative z-10`}>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-center`}>{title}</div>
        <div className='w-full flex justify-center items-center gap-4'>
          {customIcon ? (
            <img className='w-10 h-10' src={customIcon} alt='icon' />
          ) : (
            <img className='w-10 h-10' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
          )}
          <div className='text-2xl font-semibold'>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default BasicTheme
