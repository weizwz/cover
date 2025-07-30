'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import unsplash from '../config/unsplash'
import { CoverContext } from './coverContext'
import UnsplashImage from './unsplashImage'

const UnsplashSearch: React.FC<UnsplashSearchProps> = ({ largeImgPreview, onImageSelect }) => {
  const [imageList, setImageList] = useState<UnsplashImageResp[]>([])
  const { coverSetting, setCoverSetting, unsplashParam, setUnsplashParam } = useContext(CoverContext)
  const [text, setText] = useState(unsplashParam.query)

  const selectImage = (image: UnsplashImageResp) => {
    setCoverSetting({
      ...coverSetting,
      bg: {
        ...coverSetting.bg,
        type: 'unsplash',
        image: undefined,
        unsplashUrl: image.urls.regular
      }
    })
    
    // 如果有回调函数，调用它
    if (onImageSelect) {
      onImageSelect()
    }
  }

  // 回车搜索
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      // 在这里处理 Enter 键被按下的逻辑
      searchImage()
    }
  }

  const searchImage = () => {
    if (text.trim() === '') {
      return
    }
    setUnsplashParam({ ...unsplashParam, query: text.trim(), page: 1 })
  }

  useEffect(() => {
    if (unsplashParam.query === '') {
      return
    }
    unsplash.search.getPhotos(unsplashParam).then((resp) => {
      if (resp.response?.results) {
        setImageList(resp.response.results as UnsplashImageResp[])
      } else {
        setImageList([])
      }
    })
  }, [unsplashParam])

  return (
    <div className='ignore w-full flex-1 flex flex-col overflow-hidden'>
      {/* 搜索区域 */}
      <div className='w-full mb-4'>
        <div className='max-w-2xl mx-auto'>
          <div className='relative pr-2 flex justify-between items-center bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200'>
            <input
              type='text'
              value={text}
              placeholder='搜索高质量背景图片... (请使用英文关键词)'
              className='flex-1 px-4 py-3 text-base bg-transparent border-0 rounded-xl focus:outline-none focus:ring-0 placeholder-gray-400'
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button 
              className='cursor-pointer px-6' 
              onClick={searchImage}
            >
              <Search className='w-4 h-4 mr-2 hidden md:block' />
              搜索
            </Button>
          </div>
        </div>
      </div>

      {/* 分页控制 */}
      <div className='flex items-center justify-center gap-2'>
        <Button 
          className='cursor-pointer px-4 py-2' 
          variant='outline'
          disabled={unsplashParam.page === 1} 
          onClick={() => setUnsplashParam({ ...unsplashParam, page: 1 })}
        >
          首页
        </Button>
        <Button
          className='cursor-pointer px-4 py-2'
          variant='outline'
          disabled={unsplashParam.page === 1}
          onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page > 1 ? unsplashParam.page - 1 : 1 })}
        >
          上页
        </Button>
        <span className='px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md'>
          第 {unsplashParam.page} 页
        </span>
        <Button 
          className='cursor-pointer px-4 py-2' 
          variant='outline'
          onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page + 1 })}
        >
          下页
        </Button>
      </div>

      {/* 图片网格 */}
      <div className='flex-1 mt-4 overflow-y-auto'>
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
          {imageList.map((image) => {
            return (
              <div
                key={image.id}
                className={`group rounded-xl relative cursor-pointer bg-gray-100 ${largeImgPreview ? 'aspect-[4/3]' : 'aspect-square'}`}
                onClick={() => selectImage(image)}
              >
                <UnsplashImage src={image.urls.regular} alt={image.alt_description} user={image.user} links={image.links}/>
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800'>
                    点击选择
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* 空状态 */}
        {imageList.length === 0 && (
          <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
            <Search className='w-12 h-12 mb-4 opacity-50' />
            <p className='text-lg font-medium mb-2'>暂无搜索结果</p>
            <p className='text-sm'>请切换网络 或 尝试使用英文关键词搜索，如 &quot;nature&quot;, &quot;abstract&quot;, &quot;minimal&quot;</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnsplashSearch
