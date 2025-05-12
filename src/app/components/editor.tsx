'use client'

import { useContext, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { LoaderCircle } from 'lucide-react'

import EditorPreview from './editorPreview'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme'
import { CoverContext } from './coverContext'
import { DEFAULT_SETTING } from '../settings/default'

const Editor = () => {
  const { setCoverSetting } = useContext(CoverContext)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1024px)')

    const handleResize = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches)
    }

    // 初始化检查
    setIsSmallScreen(mediaQueryList.matches)
    // 初始化数据
    const savedData = localStorage.getItem('coverSetting')
    const defaultData = savedData ? JSON.parse(savedData) : DEFAULT_SETTING
    setCoverSetting({ ...DEFAULT_SETTING, ...defaultData })
    setLoading(false)
    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleResize)
    // 清理事件监听器
    return () => mediaQueryList.removeEventListener('change', handleResize)
  }, [setCoverSetting])

  if (loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-2'>
          <LoaderCircle size={48} className='animate-spin mb-4' /> 加载中…
        </div>
      </div>
    )

  return (
    <div className='pt-14 h-full'>
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
            <div className='w-full h-full overflow-auto bg-gray-50'>
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
    </div>
  )
}

export default Editor
