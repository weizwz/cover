import { THEMES } from './themes'
import { FONTS } from './fonts'
import { PATTERNS } from './patterns'
import { COLORS_RANDOM } from './colorsRandom'
import { SIZES } from './sizes'

export const DEFAULT_ICON: IconOption = { label: 'xiaohongshu', value: 'simple-icons:xiaohongshu' }

export const DEFAULT_UNSPLASH_PARAM: UnsplashParam = {
  query: 'beautiful background',
  page: 1,
  per_page: 12
}

export const DEFAULT_UNSPLASH_IMAGE: UnsplashImage = {
  searchText: DEFAULT_UNSPLASH_PARAM.query,
  url: '',
  downloadLink: ''
}

export const DEFAULT_SETTING: Setting = {
  title: '免费、漂亮的封面生成器',
  author: '唯知笔记',
  download: 'png',
  scale: 2,
  icon: DEFAULT_ICON,
  customIcon: '',
  theme: THEMES[0],
  font: FONTS[0],
  color: { ...COLORS_RANDOM[0], bgImage: '' },
  pattern: PATTERNS[0],
  size: SIZES[0],
  unsplashImage: DEFAULT_UNSPLASH_IMAGE
}