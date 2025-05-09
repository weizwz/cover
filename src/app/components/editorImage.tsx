'use client'

import { useContext } from 'react'
import '../assets/css/theme.css'
import '../assets/css/patterns.css'
import ModernTheme from '../theme/modernTheme'
import BasicTheme from '../theme/basicTheme'
import OutlineTheme from '../theme/outlineTheme'
import PreviewTheme from '../theme/previewTheme'
import StylishTheme from '../theme/stylishTheme'
import MobileMockupTheme from '../theme/mobileMockupTheme'
import BackgroundTheme from '../theme/backgroundTheme'
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

  return <div className={`w-full ${coverSetting.size.value}`}>{selectTheme(coverSetting.theme.value)}</div>
}

export default EditorImage
