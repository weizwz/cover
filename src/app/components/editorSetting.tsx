'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
// import { DEFAULT_SETTING } from '../settings/default'

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [ fontData, setFontData ] = useState<FontData[]>([])

  // 初始化
  useEffect(() => {
    setFontData(groupWithTypeName(FONTS))
  }, [])

  // 字体分组显示
  const groupWithTypeName = (items: Font[]): FontData[] => {
    const grouped = items.reduce<Record<string, FontData>>((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {
          type: item.type,
          typeName: item.typeName,
          list: []
        };
      }
      acc[item.type].list.push(item);
      return acc;
    }, {});
  
    return Object.values(grouped);
  }

  const changeValue = (value: string, key: string, array: any[]) => {
    const selectedOption = array.filter((item) => {
      return item.value === value
    })
    setCoverSetting({
      ...coverSetting,
      [key]: selectedOption[0]
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(coverSetting.font.label, coverSetting.font.url)
  }, [coverSetting.font.label, coverSetting.font.url])

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
              defaultValue={coverSetting.title}
              onChange={(e) => setCoverSetting({ ...coverSetting, title: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author' className='w-12 justify-end'>作者</Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              defaultValue={coverSetting.author}
              onChange={(e) => setCoverSetting({ ...coverSetting, author: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author' className='w-12 justify-end'>图标</Label>
            <IconSelect onChange={(selectedOption) => setCoverSetting({ ...coverSetting, icon: selectedOption as IconOption })} />
          </div>
          <div className='flex w-full 2xl:w-1/2 2xl:pr-2 space-x-1.5 mb-4'>
            <Label htmlFor='font' className='w-12 justify-end'>字体</Label>
            <Select defaultValue={coverSetting.font.value} onValueChange={(value) => { changeValue(value, 'font', FONTS) }}>
              <SelectTrigger id='font' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择字体' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {fontData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>{item.typeName}</SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem className={temp.value} key={temp.value} value={temp.value}>
                        {temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full 2xl:w-1/2 2xl:pl-2 space-x-1.5 mb-4'>
            <Label htmlFor='bg' className='w-12 justify-end'>背景色</Label>
            <Input
              id='bg'
              type='color'
              className='flex-1 focus-visible:ring-1'
              placeholder='请选择背景色'
              defaultValue={coverSetting.color.bgColor}
              onChange={(e) => setCoverSetting({ ...coverSetting, color: { bgColor: e.target.value} })}
            />
          </div>
          <div className='flex w-full 2xl:w-1/2 2xl:pr-2 space-x-1.5 mb-4'>
            <Label htmlFor='pattern' className='w-12 justify-end'>纹理</Label>
            <Select defaultValue={coverSetting.pattern.value} onValueChange={(value) => { changeValue(value, 'pattern', PATTERNS) }}>
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
          <div className='flex w-full 2xl:w-1/2 2xl:pl-2 space-x-1.5 mb-4'>
            <Label htmlFor='size' className='w-12 justify-end'>尺寸</Label>
            <Select defaultValue={coverSetting.size.value} onValueChange={(value) => { changeValue(value, 'size', SIZES) }}>
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

