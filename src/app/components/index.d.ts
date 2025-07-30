interface CoverContextType {
  coverSetting: Setting
  setCoverSetting: React.Dispatch<React.SetStateAction<Setting>>
  unsplashParam: UnsplashParam
  setUnsplashParam: React.Dispatch<React.SetStateAction<UnsplashParam>>
  selectedGradientColorKey: string
  setSelectedGradientColorKey: React.Dispatch<React.SetStateAction<string>>
  applyTemplate: (templateData: Setting) => void
}

interface UnsplashImageRespUserLink {
  html: string
}

interface UnsplashImageRespUserImage {
  medium: string
}

interface UnsplashImageRespUser {
  id: string
  username: string
  links: UnsplashImageRespUserLink
  profile_image: UnsplashImageRespUserImage
}

interface UnsplashImageProps {
  src: string
  alt: string
  user: UnsplashImageRespUser
  links: UnsplashImageRespLink
}

interface UnsplashSearchProps {
  largeImgPreview: boolean
  onImageSelect?: () => void
}

interface UnsplashImageRespUrl {
  regular: string
}

interface UnsplashImageRespLink {
  download_location: string
  html: string
}

interface UnsplashImageResp {
  id: string
  alt_description: string
  urls: UnsplashImageRespUrl
  links: UnsplashImageRespLink
  user: UnsplashImageRespUser
}

interface EditorToImgProps {
  children: React.ReactNode
}

type GroupItem = Font | Pattern

interface GroupData {
  type: string
  typeName: string
  list: GroupItem[]
}

interface CenterAlertOptions {
  type: 'success' | 'error' | undefined
  title?: string
  message?: string
}

interface CenteredAlertProps extends CenterAlertOptions {
  onClose: () => void
}
