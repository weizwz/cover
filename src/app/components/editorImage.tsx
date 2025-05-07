'use client'

import { useContext, useState } from 'react'
import '../assets/css/theme.css'
import '../assets/css/patterns.css'
import ModernTheme from '../Themes/ModernTheme'
import BasicTheme from '../Themes/BasicTheme'
import OutlineTheme from '../Themes/OutlineTheme'
import PreviewTheme from '../Themes/PreviewTheme'
import StylishTheme from '../Themes/StylishTheme'
import MobileMockupTheme from '../Themes/MobileMockupTheme'
import BackgroundTheme from '../Themes/BackgroundTheme'
import { CoverContext } from './coverContext'

const EditorImage = () => {
  const { coverSetting } = useContext(CoverContext)
  const [setting] = useState(coverSetting)
  
  const selectTheme = (theme: string) => {
    switch (theme) {
      case 'basic':
        return <BasicTheme config={setting} />
      case 'modern':
        return <ModernTheme config={setting} />
      case 'outline':
        return <OutlineTheme config={setting} />
      case 'preview':
        return <PreviewTheme config={setting} />
      case 'stylish':
        return <StylishTheme config={setting} />
      case 'mobile':
        return <MobileMockupTheme config={setting} />
      case 'background':
        return <BackgroundTheme config={setting} />
      default:
        return <BasicTheme config={setting} />
    }
  }

  return <div className={`md:scale-100 scale-50 w-full ${setting.size}`}>{selectTheme(setting.theme.value)}</div>
}

export default EditorImage
