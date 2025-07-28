interface SelectOption {
  label: string
  value: string
}

interface Theme extends SelectOption {
  // 预览图像
  preview: StaticImageData
  // 图文左右交换位置
  swapX?: boolean
  // 图片上下拉伸
  stretchY?: boolean
}

interface ColorRandom {
  bgColor: string
  bgImage?: string
}

interface Font extends SelectOption {
  url: string
  type: string
  typeName: string
  lineHeight?: string
}

interface Pattern extends SelectOption {
  type: string
  typeName: string
  isOpacity?: boolean
}

type Size = SelectOption

type IconOption = SelectOption

interface UnsplashParam {
  query: string
  page: number
  per_page: number
}

interface UnsplashImage {
  searchText: string
  url: string
  downloadLink: string
}

type DownloadType = 'png' | 'jpg' | 'webp'

interface Setting {
  title: string
  author: string
  download: DownloadType
  scale: number
  icon: IconOption
  customIcon: string
  theme: Theme
  font: Font
  color: ColorRandom
  pattern: Pattern
  size: Size
  unsplashImage?: UnsplashImage
}
