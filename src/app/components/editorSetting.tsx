'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
// import { DEFAULT_SETTING } from '../settings/default'

const EditorSetting = () => {
  const { coverSetting } = useContext(CoverContext)
  const [setting, setSetting] = useState(coverSetting)

  const changeValue = (value: string, key: string, array: any[]) => {
    const selectedOption = array.filter((item) => {
      return item.value === value
    })
    setSetting({
      ...setting,
      [key]: selectedOption[0]
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(setting.font.label, setting.font.url)
  }, [setting.font.label, setting.font.url])

  return (
    <div className='h-full w-full overflow-y-auto p-4 pr-8'>
      <h2 className='text-lg font-bold text-center mb-4'>基础配置</h2>
      <form>
        <div className='flex w-full items-center flex-wrap'>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='title' className='w-12 justify-end'>标题</Label>
            <Textarea
              id='title'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入封面标题'
              defaultValue={setting.title}
              onChange={(e) => setSetting({ ...setting, title: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author' className='w-12 justify-end'>作者</Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              defaultValue={setting.author}
              onChange={(e) => setSetting({ ...setting, author: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author' className='w-12 justify-end'>图标</Label>
            <IconSelect onChange={(selectedOption) => setSetting({ ...setting, icon: selectedOption as IconOption })} />
          </div>
          <div className='flex w-full xl:w-1/2 xl:pr-2 space-x-1.5 mb-4'>
            <Label htmlFor='font' className='w-12 justify-end'>字体</Label>
            <Select defaultValue={setting.font.value} onValueChange={(value) => { changeValue(value, 'font', FONTS) }}>
              <SelectTrigger id='font' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择字体' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {FONTS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full xl:w-1/2 xl:pl-2 space-x-1.5 mb-4'>
            <Label htmlFor='bg' className='w-12 justify-end'>背景色</Label>
            <Input
              id='bg'
              type='color'
              className='flex-1 focus-visible:ring-1'
              placeholder='请选择背景色'
              defaultValue={setting.color.bgColor}
              onChange={(e) => setSetting({ ...setting, color: { bgColor: e.target.value} })}
            />
          </div>
          <div className='flex w-full xl:w-1/2 xl:pr-2 space-x-1.5 mb-4'>
            <Label htmlFor='pattern' className='w-12 justify-end'>纹理</Label>
            <Select defaultValue={setting.pattern.value} onValueChange={(value) => { changeValue(value, 'pattern', PATTERNS) }}>
              <SelectTrigger id='pattern' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择纹理' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {PATTERNS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full xl:w-1/2 xl:pl-2 space-x-1.5 mb-4'>
            <Label htmlFor='size' className='w-12 justify-end'>尺寸</Label>
            <Select defaultValue={setting.size.value} onValueChange={(value) => { changeValue(value, 'size', SIZES) }}>
              <SelectTrigger id='pattern' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择尺寸' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {SIZES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </form>
    </div>
  )
}

export default EditorSetting
