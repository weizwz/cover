'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern, getBlurScale } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const OutlineTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, icon, font, customIcon, bgBlur, bgGrayscale } = config
  const { coverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)
  const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className={`relative h-full w-full text-white`} style={backgroundStyle}>
      {showPattern && <div className={`absolute h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      {(bgBlur > 0 || bgGrayscale > 0) && (
        <div
          className="absolute h-full w-full"
          style={{
            backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
          }}
        />
      )}
      <div className={`relative z-10 flex h-full w-full flex-col justify-center gap-6 p-24 pb-34`}>
        <div className="flex items-center">
          <img className="h-18 w-18" src={customIcon || `${iconifyHost}/${icon.value}.svg?color=%23fff`} alt={`${icon.label} icon`} />
        </div>
        <div className={`${font.value} flex flex-col gap-6`}>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold text-shadow-black text-shadow-lg`}>{title}</div>
          <div className={`text-2xl font-semibold text-shadow-black text-shadow-sm ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default OutlineTheme
