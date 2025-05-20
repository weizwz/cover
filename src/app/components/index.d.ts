interface CoverContextType {
  coverSetting: Setting
  setCoverSetting: React.Dispatch<React.SetStateAction<Setting>>
  unsplashParam: UnsplashParam
  setUnsplashParam: React.Dispatch<React.SetStateAction<UnsplashParam>>
}

interface UnsplashImageProps {
  src: string
  alt: string
}

interface UnsplashSearchProps {
  largeImgPreview: boolean
}

interface UnsplashImageRespUrl {
  regular: string
}

interface UnsplashImageRespLink {
  download_location: string
}

interface UnsplashImageResp {
  id: string
  alt_description: string
  urls: UnsplashImageRespUrl
  links: UnsplashImageRespLink
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
