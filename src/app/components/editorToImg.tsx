'use client'

import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LoaderCircle, Download, Copy, ArrowRightLeft, ImageUpscale } from 'lucide-react'
import html2canvas from 'html2canvas-pro'
import type { Options } from 'html2canvas-pro'

import CenteredAlert from './common/centeredAlert'
import { CoverContext } from './coverContext'
import { base64ToBlob, getFormattedDateTime } from '../tools/utils'

const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [copyLoading, setCopyLoading] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
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
    a.download = `ThisCover_${getFormattedDateTime()}.${coverSetting.download}`
    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)
  }

  const downloadImage = async (): Promise<void> => {
    setLoading(true)

    if (componentRef.current) {
      const data = await getData(componentRef.current)
      await saveImage(data)

      // 如果使用了unsplash图片，追踪下载
      if (coverSetting.bg.type === 'unsplash' && coverSetting.bg.unsplashUrl) {
        // 这里需要从unsplashParam中获取下载链接，暂时注释掉
        // unsplash.photos.trackDownload({ downloadLocation: downloadLink })
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

  const changeThemeAndSwapX = (): void => {
    setCoverSetting({
      ...coverSetting,
      theme: { ...coverSetting.theme, swapX: !coverSetting.theme.swapX }
    })
  }

  const changeThemeStretchY = (): void => {
    setCoverSetting({
      ...coverSetting,
      theme: { ...coverSetting.theme, stretchY: !coverSetting.theme.stretchY }
    })
  }

  return (
    <React.Fragment>
      <div className='relative'>
        <div className='2xl:absolute 2xl:top-0 2xl:left-full px-4 pb-4 flex 2xl:flex-col gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' disabled={loading} variant='outline' size='icon' onClick={() => downloadImage()}>
                  {loading ? <LoaderCircle className='animate-spin' /> : <Download />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>下载图片</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className='cursor-pointer' disabled={copyLoading} variant='outline' size='icon' onClick={() => copyImage()}>
                  {copyLoading ? <LoaderCircle className='animate-spin' /> : <Copy />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>复制图片</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {coverSetting.theme.swapX !== undefined && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`group cursor-pointer ${coverSetting.theme.swapX ? 'bg-primary' : ''} hover:bg-primary`}
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      changeThemeAndSwapX()
                    }}>
                    <ArrowRightLeft className={`${coverSetting.theme.swapX ? 'text-white' : ''} group-hover:text-white`}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>图文互换位置</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {coverSetting.theme.stretchY !== undefined && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={`group cursor-pointer ${coverSetting.theme.stretchY ? 'bg-primary' : ''} hover:bg-primary`}
                    variant='outline'
                    size='icon'
                    onClick={() => {
                      changeThemeStretchY()
                    }}>
                    <ImageUpscale className={`rotate-180 scale-x-[-1] ${coverSetting.theme.stretchY ? 'text-white' : ''} group-hover:text-white`}/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>图片填满空间</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div ref={componentRef}>{props.children}</div>
        {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
      </div>
    </React.Fragment>
  )
}

export default EditorToImg
