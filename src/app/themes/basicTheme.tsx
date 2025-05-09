'use client'

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config

  return (
    <div className={`flex text-gray-800 justify-center items-center h-full ${pattern.value}  p-12`} style={{ backgroundColor: color.bgColor }}>
      <div className={`w-full h-full max-h-[360px] max-w-[640px] flex flex-col justify-center items-center gap-12 p-12 ${font.value} bg-white rounded-xl`}>
        <div>
          <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-gray-800 text-shadow-lg`}>{title}</h1>
        </div>

        <div className='w-full flex justify-between rounded-xl items-center'>
          {customIcon ? (
            <div className='w-12 h-12'>
              <img src={customIcon} alt='img' className='rounded-full bg-white p-1 border-white' />
            </div>
          ) : (
            <div className='items-center justify-center flex'>
              <img className='w-12 h-12' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
            </div>
          )}
          <h2 className='text-2xl font-semibold text-gray-800 text-shadow-sm'>{author}</h2>
        </div>
      </div>
    </div>
  )
}

export default BasicTheme
