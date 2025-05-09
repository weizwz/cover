interface SelectOption {
  label: string
  value: string
}

interface Theme extends SelectOption {
  preview: StaticImageData
}

interface ColorRandom {
  bgColor: string
}

interface Font extends SelectOption {
  url: string
  type: string
  typeName: string
  lineHeight?: string
}

type Pattern = SelectOption

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

interface Setting {
  title: string
  author: string
  download: 'png' | 'jpg'
  icon: IconOption
  customIcon: string
  theme: Theme
  font: Font
  color: ColorRandom
  pattern: Pattern
  size: Size
  unsplashImage?: UnsplashImage
}
