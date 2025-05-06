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
}

interface Pattern extends SelectOption {}

interface Size extends SelectOption {}

interface IconOption extends SelectOption {}

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
}