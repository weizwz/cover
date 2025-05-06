import { THEMES } from './themes'
import { FONTS } from './fonts'
import { PATTERNS } from './patterns'
import { COLORS_RANDOM } from './colorsRandom'
import { SIZES } from './sizes'

export const defaultIcon: IconOption = { label: 'xiaohongshu', value: 'xiaohongshu' }

export const defaultSettings: Setting = {
  title: '免费、快速的封面生成器',
  author: '唯知笔记',
  download: 'png',
  icon: defaultIcon,
  customIcon: '',
  theme: THEMES[0],
  font: FONTS[0],
  color: COLORS_RANDOM[0],
  pattern: PATTERNS[0],
  size: SIZES[2]
}