'use client'

import React, { useContext, useState } from 'react'
import { CoverContext } from './coverContext'
import unsplash from '../config/unsplash'
import { LoaderCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas-pro'
import type { Options } from 'html2canvas-pro'
import { getFormattedDateTime } from '../tools/date'

const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { coverSetting } = useContext(CoverContext)
  const componentRef = React.createRef<HTMLDivElement>()

  async function saveImage(data: string): Promise<void> {
    const a = document.createElement('a') as HTMLAnchorElement
    a.href = data
    a.download = `thisCover-${getFormattedDateTime()}.png`
    document.body.appendChild(a)
    setLoading(false)

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
      },
    }

    return await html2canvas(element, options).then((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL('image/png')
    })
  }

  return (
    <React.Fragment>
      <div className='relative'>
        <div ref={componentRef}>{props.children}</div>
        <div className='absolute -inset-y-10 left-4 lg:top-0 lg:left-full w-16 h-16 px-4'>
          <Button className='cursor-pointer' disabled={loading} variant='outline' size='icon' onClick={() => downloadImage()}>
            {loading ? <LoaderCircle className='animate-spin' /> : <Download />}
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditorToImg
