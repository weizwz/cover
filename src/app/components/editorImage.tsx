import React from 'react'
import './CoverImage.css'
import '../assets/css/patterns.css'
import ModernTheme from '../Themes/ModernTheme'
import BasicTheme from '../Themes/BasicTheme'
import OutlineTheme from '../Themes/OutlineTheme'
import PreviewTheme from '../Themes/PreviewTheme'
import StylishTheme from '../Themes/StylishTheme'
import MobileMockupTheme from '../Themes/MobileMockupTheme'
import BackgroundTheme from '../Themes/BackgroundTheme'

const EditorImage = (props: EditorImageProps) => {
  const { theme } = props

  const selectTheme = (theme: string) => {
    switch (theme) {
      case 'basic':
        return <BasicTheme config={props} />
      case 'modern':
        return <ModernTheme config={props} />
      case 'outline':
        return <OutlineTheme config={props} />
      case 'preview':
        return <PreviewTheme config={props} />
      case 'stylish':
        return <StylishTheme config={props} />
      case 'mobile':
        return <MobileMockupTheme config={props} />
      case 'background':
        return <BackgroundTheme config={props} />
      default:
        return <BasicTheme config={props} />
    }
  }

  return <div className={`md:scale-100 scale-50 w-full ${props.size}`}>{selectTheme(theme)}</div>
}

export default EditorImage
