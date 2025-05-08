const ModernTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, color, pattern, author, icon, font, customIcon, size } = config
  
  return (
    <div className='overflow-y-hidden w-full h-full flex items-center'>
      <div
        className={`h-full w-full text-gray-800 flex ${size.value.indexOf('vertical') !== -1 ? 'flex-col' : ''} justify-center items-center ${pattern.value} gap-12 p-12`}
        style={{ backgroundColor: color.bgColor }}>
        {customIcon ? (
          <div className='mx-auto items-center justify-center flex'>
            <img src={customIcon} alt='img' className='w-28 h-28 rounded-full bg-white border-4 border-white' />
          </div>
        ) : (
          <div className='rounded-full p-6 w-32 h-32 bg-white items-center justify-center flex'>
            <img className='w-16 h-16' src={`https://api.iconify.design/simple-icons/${icon.value}.svg`} alt={`${icon.label} icon`} />
          </div>
        )}

        <div className='h-full flex-1 max-h-[360px] max-w-[640px]'>
          <div className={`${font.value} bg-white px-12 justify-center text-left rounded-2xl h-full p-4 flex flex-col`}>
            <h1 className={`text-5xl ${font?.lineHeight || 'leading-[1.2]'} font-bold text-gray-800`}>{title}</h1>
            <h2 className='text-2xl mt-10 font-semibold text-left '>{author}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernTheme
