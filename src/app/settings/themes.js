import backgroundThemePlaceholder from '../assets/images/background-theme-placeholder.webp'
import basicThemePlaceholder from '../assets/images/basic-theme-placeholder.webp'
import modernThemePlaceholder from '../assets/images/modern-theme-placeholder.webp'
import stylishThemePlaceholder from '../assets/images/stylish-theme-placeholder.webp'
import outlineThemePlaceholder from '../assets/images/outline-theme-placeholder.webp'
import previewThemePlaceholder from '../assets/images/preview-theme-placeholder.webp'
import mobileThemePlaceholder from '../assets/images/mobile-theme-placeholder.webp'

export const THEMES = [
  {
    label: 'modern',
    name: '现代风',
    preview: modernThemePlaceholder
  },
  {
    label: 'basic',
    name: '背景卡片',
    preview: basicThemePlaceholder
  },
  {
    label: 'outline',
    name: '背景平铺',
    preview: outlineThemePlaceholder
  },
  {
    label: 'background',
    name: '背景图 - 需加载图片',
    preview: backgroundThemePlaceholder
  },
  {
    label: 'stylish',
    name: '图文对称 - 需加载图片',
    preview: stylishThemePlaceholder
  },
  {
    label: 'preview',
    name: '桌面预览',
    preview: previewThemePlaceholder
  },
  {
    label: 'mobile',
    name: '手机预览',
    preview: mobileThemePlaceholder
  }
]
