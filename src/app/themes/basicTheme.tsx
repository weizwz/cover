'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, hasBackgroundImage } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, icon, font, customIcon } = config
  const { coverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const hasImage = hasBackgroundImage(coverSetting.bg)

  return (
    <div className={`flex text-gray-800 justify-center items-center h-full p-12 relative`} style={backgroundStyle}>
      {!hasImage && <div className={`absolute w-full h-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      <div
        className={`w-full h-full max-h-[360px] max-w-[640px] flex flex-col justify-center items-center gap-6 p-12 ${font.value} bg-white rounded-2xl relative z-10`}>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-center`}>{title}</div>
        <div className='w-full flex justify-center items-center gap-4'>
          <img className='w-10 h-10' src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default BasicTheme
