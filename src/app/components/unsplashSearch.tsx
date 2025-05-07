'use client'

import React, { useState, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import unsplash from '../config/unsplash'
import { CoverContext } from './coverContext'
import UnsplashImage from './unsplashImage'

const UnsplashSearch: React.FC<UnsplashSearchProps> = ({ largeImgPreview }) => {
  const [imageList, setImageList] = useState<UnsplashImageResp[]>([])
  const { coverSetting, setCoverSetting, unsplashParam, setUnsplashParam } = useContext(CoverContext)
  const [text, setText] = useState(unsplashParam.query)

  const selectImage = (image: UnsplashImageResp) => {
    setCoverSetting({
      ...coverSetting,
      unsplashImage: {
        searchText: unsplashParam.query,
        url: image.urls.regular,
        downloadLink: image.links.download_location
      }
    })
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
    <div className='w-full h-full p-4 flex flex-col bg-white items-center justify-center'>
      <div className='w-full flex items-center mb-4'>
        <form className=' mx-auto w-full flex bg-gray-50 rounded-full border border-gray-50'>
          <input
            type='text'
            value={text}
            placeholder='请输入搜索关键词'
            className='focus:outline-none w-full text-lg bg-gray-50 p-1 px-4  rounded-full'
            onChange={(e) => setText(e.target.value)}
          />

          <Button onClick={() => setUnsplashParam({ ...unsplashParam, query: text, page: 1 })}>
            <Search /> 搜索
          </Button>
        </form>
      </div>

      <div className={`overflow-y-auto overflow-x-hidden rounded-lg mb-4`} style={{ height: 'calc(100% - 54px)' }}>
        <div className={`grid gap-4 ${largeImgPreview ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {imageList.map((image) => {
            return (
              <div key={image.id} className={`rounded-lg relative cursor-pointer w-full ${largeImgPreview ? 'h-32' : 'h-20'}`}>
                <span className='font-Inter top-2 left-2 absolute z-10 text-sm font-semibold text-white opacity-50'>点击选择此照片</span>
                <UnsplashImage src={image.urls.regular} alt={image.alt_description} onClick={() => selectImage(image)} />
              </div>
            )
          })}
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <Button disabled={unsplashParam.page === 1} onClick={() => setUnsplashParam({ ...unsplashParam, page: 1 })}>
          首页
        </Button>
        <Button
          disabled={unsplashParam.page === 1}
          onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page > 1 ? unsplashParam.page - 1 : 1 })}>
          上一页
        </Button>
        <Button onClick={() => setUnsplashParam({ ...unsplashParam, page: unsplashParam.page + 1 })}>下一页</Button>
      </div>
    </div>
  )
}

export default UnsplashSearch
