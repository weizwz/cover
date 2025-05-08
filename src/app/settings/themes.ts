import backgroundThemePlaceholder from '../assets/images/background-theme-placeholder.webp'
import basicThemePlaceholder from '../assets/images/basic-theme-placeholder.webp'
import modernThemePlaceholder from '../assets/images/modern-theme-placeholder.webp'
import stylishThemePlaceholder from '../assets/images/stylish-theme-placeholder.webp'
import outlineThemePlaceholder from '../assets/images/outline-theme-placeholder.webp'
import previewThemePlaceholder from '../assets/images/preview-theme-placeholder.webp'
import mobileThemePlaceholder from '../assets/images/mobile-theme-placeholder.webp'

export const THEMES: Theme[] = [
  {
    label: '现代',
    value: 'modern',
    preview: modernThemePlaceholder
  },
  {
    label: '经典',
    value: 'basic',
    preview: basicThemePlaceholder
  },
  {
    label: '平铺',
    value: 'outline',
    preview: outlineThemePlaceholder
  },
  {
    label: '背景',
    value: 'background',
    preview: backgroundThemePlaceholder
  },
  {
    label: '图文对称',
    value: 'stylish',
    preview: stylishThemePlaceholder
  },
  {
    label: '桌面预览',
    value: 'preview',
    preview: previewThemePlaceholder
  },
  {
    label: '手机预览',
    value: 'mobile',
    preview: mobileThemePlaceholder
  }
]
