'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const ModernTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, icon, font, customIcon, size } = config
  const { coverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)

  return (
    <div className={`h-full w-full text-gray-800 relative`} style={backgroundStyle}>
      {showPattern && <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div className={`w-full h-full flex ${size.value.indexOf('vertical') !== -1 ? 'flex-col' : ''} justify-center items-center gap-8 p-16 relative z-10`}>
        <div className='rounded-full w-32 h-32 bg-white flex items-center justify-center'>
          <img className='w-18 h-18' src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
        </div>
        <div className={`h-full flex-1 max-h-[360px] max-w-[640px] ${font.value} bg-white p-12 flex flex-col justify-center rounded-2xl gap-8`}>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold`}>{title}</div>
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default ModernTheme
