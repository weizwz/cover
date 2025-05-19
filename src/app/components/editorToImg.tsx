'use client'

import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Download, Copy } from 'lucide-react'
import html2canvas from 'html2canvas-pro'
import type { Options } from 'html2canvas-pro'

import CenteredAlert from './common/centeredAlert'
import { CoverContext } from './coverContext'
import unsplash from '../config/unsplash'
import { getFormattedDateTime } from '../tools/date'
import { base64ToBlob } from '../tools/img'

const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [copyLoading, setCopyLoading] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()
  const { coverSetting } = useContext(CoverContext)
  const componentRef = React.createRef<HTMLDivElement>()

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  async function saveImage(data: string): Promise<void> {
    const a = document.createElement('a') as HTMLAnchorElement
    a.href = data
    a.download = `thisCover-${getFormattedDateTime()}.${coverSetting.download}`
    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)
  }

  const downloadImage = async (): Promise<void> => {
    setLoading(true)

    if (componentRef.current) {
      const data = await getData(componentRef.current)
      await saveImage(data)

      if (coverSetting.unsplashImage?.downloadLink) {
        unsplash.photos.trackDownload({ downloadLocation: coverSetting.unsplashImage.downloadLink })
      }
    }

    setLoading(false)
    showNotification({
      type: 'success',
      title: '图片已生成',
      message: '请及时下载图片到本地'
    })
  }

  const copyImage = async (): Promise<void> => {
    setCopyLoading(true)

    if (componentRef.current) {
      const data = await getData(componentRef.current)
      await copyImageToClipboard(data)
    }

    setCopyLoading(false)
  }

  async function getData(element: HTMLElement): Promise<string> {
    // https://github.com/yorickshan/html2canvas-pro/blob/main/docs/configuration.md
    const options: Options = {
      useCORS: true,
      scale: coverSetting.scale,
      backgroundColor: null,
      allowTaint: true,
      height: element.offsetHeight,
      width: element.offsetWidth,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      x: 0,
      y: 0,
      logging: process.env.NODE_ENV === 'development',
      imageTimeout: 15000,
      foreignObjectRendering: false,
      ignoreElements: (element) => {
        return element.classList.contains('ignore')
      }
    }

    return await html2canvas(element, options).then((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL('image/' + coverSetting.download)
    })
  }

  async function copyImageToClipboard(base64: string): Promise<void> {
    try {
      const blob = base64ToBlob(base64)
      const clipboardItem = new ClipboardItem({ ['image/png']: blob })
      await navigator.clipboard.write([clipboardItem])
      showNotification({
        type: 'success',
        title: '复制成功',
        message: '图片已复制到剪贴板'
      })
    } catch (err) {
      showNotification({
        type: 'error',
        title: '复制失败',
        message: '' + err
      })
    }
  }

  return (
    <React.Fragment>
      <div className='relative'>
        <div className='lg:absolute lg:top-0 lg:left-full lg:w-16 px-4 pb-4 flex lg:flex-col gap-2'>
          <Button className='cursor-pointer' disabled={loading} variant='outline' size='icon' onClick={() => downloadImage()}>
            {loading ? <LoaderCircle className='animate-spin' /> : <Download />}
          </Button>
          <Button className='cursor-pointer' disabled={copyLoading} variant='outline' size='icon' onClick={() => copyImage()}>
            {copyLoading ? <LoaderCircle className='animate-spin' /> : <Copy />}
          </Button>
        </div>
        <div ref={componentRef}>{props.children}</div>
        {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
      </div>
    </React.Fragment>
  )
}

export default EditorToImg
