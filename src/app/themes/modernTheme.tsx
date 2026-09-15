'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern, getBlurScale } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const ModernTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, icon, font, customIcon, size, bgBlur, bgGrayscale } = config
  const { coverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)
    const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className={`relative h-full w-full text-gray-800`} style={backgroundStyle}>
      {showPattern && <div className={`absolute h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      {(bgBlur > 0 || bgGrayscale > 0) && (
        <div
          className="absolute h-full w-full"
          style={{
            backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
          }}
        />
      )}
      <div className={`flex h-full w-full ${size.value.indexOf('vertical') !== -1 ? 'flex-col' : ''} relative z-10 items-center justify-center gap-8 p-16`}>
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white">
          <img className="h-18 w-18" src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
        </div>
        <div className={`h-full max-h-90 max-w-160 flex-1 ${font.value} flex flex-col justify-center gap-8 rounded-2xl bg-white p-12`}>
          <div className={`text-5xl ${font?.lineHeight || 'leading-14'} font-bold`}>{title}</div>
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default ModernTheme
