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
  urls: UnsplashImageRespUrl,
  links: UnsplashImageRespLink
}

interface EditorToImgProps {
  children: React.ReactNode;
}

interface GetDataOptions {
  useCORS: boolean
  scale: number
  backgroundColor: string | null
  allowTaint: boolean
  height: number
  width: number
}

interface FontData {
  type: string;
  typeName: string;
  list: Font[];
}