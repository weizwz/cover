import { THEMES } from './themes'
import { FONTS } from './fonts'
import { PATTERNS } from './patterns'
import { COLORS_RANDOM } from './colorsRandom'
import { SIZES } from './sizes'

export const defaultIcon = { label: 'xiaohongshu', value: 'xiaohongshu' }

export const defaultSettings = {
  title: '免费、快速的封面生成器',
  bgColor: COLORS_RANDOM[0].bgColor,
  pattern: PATTERNS[0].value,
  download: 'PNG',
  author: '唯知笔记',
  icon: defaultIcon,
  font: FONTS[0].value,
  theme: THEMES[0].value,
  customIcon: '',
  size: SIZES[2].value
}