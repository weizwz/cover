'use client'

const ModernTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config

  return (
    <div
      className={`h-full w-full text-gray-800 flex ${size.value.indexOf('vertical') !== -1 ? 'flex-col' : ''} justify-center items-center ${
        pattern.value
      } gap-12 p-12`}
      style={{ backgroundColor: color.bgColor }}>
      <div className='rounded-full w-32 h-32 bg-white flex items-center justify-center'>
        {customIcon ? (
          <img className='w-18 h-18' src={customIcon} alt='icon' />
        ) : (
          <img className='w-18 h-18' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
        )}
      </div>
        <div className={`h-full flex-1 max-h-[360px] max-w-[640px] ${font.value} bg-white p-12 flex flex-col justify-center rounded-2xl gap-8`}>
          <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold`}>{title}</h1>
          <h2 className='text-2xl font-semibold'>{author}</h2>
        </div>
    </div>
  )
}

export default ModernTheme
