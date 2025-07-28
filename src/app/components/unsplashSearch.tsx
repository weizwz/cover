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
    <div className='ignore w-full h-full p-4 flex flex-col bg-white items-center justify-center'>
      <div className='w-full flex items-center mb-4'>
        <div className='mx-auto w-full flex bg-gray-50 rounded-full border border-gray-50'>
          <input
            type='text'
            value={text}
            placeholder='请输入英文搜索词'
            className='focus:outline-none w-full text-lg bg-gray-100 p-1 px-2 rounded-md mr-4'
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Button className='cursor-pointer' onClick={searchImage}>
            <Search /> 搜索
          </Button>
        </div>
      </div>

      <div className='flex items-center justify-center mb-4'>
        <Button className='cursor-pointer mr-2' disabled={unsplashParam.page === 1} onClick={() => setUnsplashParam({ ...unsplashParam, page: 1 })}>
          首页
        </Button>
        <Button
          className='cursor-pointer mr-2'
          disabled={unsplashParam.page === 1}
          onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page > 1 ? unsplashParam.page - 1 : 1 })}>
          上一页
        </Button>
        <Button className='cursor-pointer' onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page + 1 })}>
          下一页
        </Button>
      </div>

      <div className={`overflow-y-auto overflow-x-hidden rounded-lg mb-4`} style={{ height: 'calc(100% - 60px)' }}>
        <div className={`grid gap-4 ${largeImgPreview ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {imageList.map((image) => {
            return (
              <div
                key={image.id}
                className={`rounded-lg relative cursor-pointer shadow-lg w-full ${largeImgPreview ? 'h-32' : 'h-20'}`}
                onClick={() => selectImage(image)}>
                <span className='font-Inter top-2 left-2 absolute z-10 text-xs font-semibold text-white text-shadow-xs text-shadow-black'>点击选择此照片</span>
                <UnsplashImage src={image.urls.regular} alt={image.alt_description} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default UnsplashSearch
