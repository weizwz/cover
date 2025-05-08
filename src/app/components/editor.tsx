'use client'

import { useEffect, useState } from 'react'
import { CoverProvider } from './coverContext'
import EditorPreview from './editorPreview'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme'
import { Separator } from '@/components/ui/separator'

const Editor = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1024px)')

    const handleResize = (event: MediaQueryListEvent | any) => {
      setIsSmallScreen(event.matches)
    }

    // 初始化检查
    handleResize(mediaQueryList)
    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleResize)
    // 清理事件监听器
    return () => mediaQueryList.removeEventListener('change', handleResize)
  }, [])

  return (
    <div className='pt-14 h-full'>
      {
        isSmallScreen ? (
          <div></div>
        ) : (
          <div className='h-full w-full flex overflow-hidden'>
            <CoverProvider>
              <div className='h-full w-1/5 xl:w-1/4'>
                <EditorSetting />
              </div>
              <Separator orientation='vertical' />
              <div className='h-full lg:flex-1 overflow-y-auto bg-gray-50'>
                <EditorPreview />
              </div>
              <Separator orientation='vertical' />
              <div className='h-full w-[120px] xl:w-[180px] 2xl:w-[300px]'>
                <EditorTheme />
              </div>
            </CoverProvider>
          </div>
        )
      }
    </div>
  )
}

export default Editor
