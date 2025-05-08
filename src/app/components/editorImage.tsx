'use client'

import { useContext } from 'react'
import '../assets/css/theme.css'
import '../assets/css/patterns.css'
import ModernTheme from '../themes/ModernTheme'
import BasicTheme from '../themes/BasicTheme'
import OutlineTheme from '../themes/OutlineTheme'
import PreviewTheme from '../themes/PreviewTheme'
import StylishTheme from '../themes/StylishTheme'
import MobileMockupTheme from '../themes/MobileMockupTheme'
import BackgroundTheme from '../themes/BackgroundTheme'
import { CoverContext } from './coverContext'

const EditorImage = () => {
  const { coverSetting } = useContext(CoverContext)
  
  const selectTheme = (theme: string) => {
    switch (theme) {
      case 'basic':
        return <BasicTheme config={coverSetting} />
      case 'modern':
        return <ModernTheme config={coverSetting} />
      case 'outline':
        return <OutlineTheme config={coverSetting} />
      case 'preview':
        return <PreviewTheme config={coverSetting} />
      case 'stylish':
        return <StylishTheme config={coverSetting} />
      case 'mobile':
        return <MobileMockupTheme config={coverSetting} />
      case 'background':
        return <BackgroundTheme config={coverSetting} />
      default:
        return <BasicTheme config={coverSetting} />
    }
  }

  return <div className={`md:scale-100 scale-50 w-full ${coverSetting.size.value}`}>{selectTheme(coverSetting.theme.value)}</div>
}

export default EditorImage
