'use client'

import { useContext } from 'react'
import { CoverContext } from '../components/coverContext'
import { getBackgroundStyle, shouldShowPattern, getBlurScale } from '../tools/backgroundUtils'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const BasicTheme: React.FC<ThemeProps> = ({ config }) => {
  const { title, pattern, author, icon, font, customIcon, bgBlur, bgGrayscale } = config
  const { coverSetting } = useContext(CoverContext)

  const backgroundStyle = getBackgroundStyle(coverSetting.bg)
  const showPattern = shouldShowPattern(coverSetting.bg)
  const blurScale = getBlurScale(coverSetting.bgBlur)

  return (
    <div className={`relative flex h-full items-center justify-center p-16 text-gray-800`} style={backgroundStyle}>
      {showPattern && <div className={`absolute h-full w-full ${pattern.value} ${pattern.isOpacity ? 'opacity-40' : ''}`} />}
      {(bgBlur > 0 || bgGrayscale > 0) && (
        <div
          className="absolute h-full w-full"
          style={{
            backdropFilter: [bgBlur > 0 ? `blur(${blurScale}px)` : '', bgGrayscale > 0 ? `grayscale(${bgGrayscale}%)` : ''].filter(Boolean).join(' ')
          }}
        />
      )}
      <div className={`flex h-full max-h-90 w-full max-w-160 flex-col items-center justify-center gap-6 p-12 ${font.value} relative z-10 rounded-2xl bg-white`}>
        <div className={`text-5xl ${font?.lineHeight || 'leading-14'} text-center font-bold`}>{title}</div>
        <div className="flex w-full items-center justify-center gap-4">
          <img className="h-10 w-10" src={customIcon || `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
          <div className={`text-2xl font-semibold ${author.trim() === '' && 'hidden'}`}>{author}</div>
        </div>
      </div>
    </div>
  )
}

export default BasicTheme
