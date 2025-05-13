'use client'

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon } = config

  return (
    <div className={`flex text-gray-800 justify-center items-center h-full ${pattern.value} p-12`} style={{ backgroundColor: color.bgColor }}>
      <div className={`w-full h-full max-h-[360px] max-w-[640px] flex flex-col justify-center items-center gap-6 p-12 ${font.value} bg-white rounded-2xl`}>
        <div>
          <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold`}>{title}</h1>
        </div>
        <div className='w-full flex justify-center items-center gap-4'>
          <div className='items-center justify-center flex'>
            {customIcon ? (
              <img className='w-10 h-10' src={customIcon} alt='icon' />
            ) : (
              <img className='w-10 h-10' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
            )}
          </div>
          <h2 className='text-2xl font-semibold'>{author}</h2>
        </div>
      </div>
    </div>
  )
}

export default BasicTheme
