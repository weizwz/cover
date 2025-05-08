'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { CoverProvider } from './coverContext'
import EditorPreview from './editorPreview'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme'

const Editor = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1024px)')

    const handleResize = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches)
    }

    // 初始化检查
    setIsSmallScreen(mediaQueryList.matches)
    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleResize)
    // 清理事件监听器
    return () => mediaQueryList.removeEventListener('change', handleResize)
  }, [])

  return (
    <div className='pt-14 h-full'>
      <CoverProvider>
        {isSmallScreen ? (
          <Tabs defaultValue='setting' className='w-full h-full'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='setting'>基础配置</TabsTrigger>
              <TabsTrigger value='preview'>封面预览</TabsTrigger>
              <TabsTrigger value='theme'>主题选择</TabsTrigger>
            </TabsList>
            <TabsContent value='setting'>
              <div className='h-full w-full'>
                <EditorSetting />
              </div>
            </TabsContent>
            <TabsContent value='preview'>
              <div className='w-full overflow-auto bg-gray-50'>
                <EditorPreview />
              </div>
            </TabsContent>
            <TabsContent value='theme'>
              <div className='h-full w-full'>
                <EditorTheme />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className='h-full w-full flex overflow-hidden'>
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
          </div>
        )}
      </CoverProvider>
    </div>
  )
}

export default Editor
