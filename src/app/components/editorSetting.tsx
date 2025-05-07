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
// import { DEFAULT_SETTING } from '../settings/default'

const EditorSetting = () => {
  const { coverSetting } = useContext(CoverContext)
  const [setting, setSetting] = useState(coverSetting)

  const changeFont = (value: string) => {
    const selectedFont = FONTS.filter((item) => {
      return item.value === value
    })
    setSetting({
      ...setting,
      font: selectedFont[0]
    })
  }

  const changePattern = (value: string) => {
    const selectedPattern = PATTERNS.filter((item) => {
      return item.value === value
    })
    setSetting({
      ...setting,
      pattern: selectedPattern[0]
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(setting.font.label, setting.font.url)
  }, [setting.font.label, setting.font.url])

  return (
    <div className='h-full w-full overflow-y-auto p-4'>
      <h2 className='text-lg font-bold text-center mb-4'>配置</h2>
      <form>
        <div className='flex w-full items-center flex-wrap'>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='title'>标 &nbsp;&nbsp; 题</Label>
            <Textarea
              id='title'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入封面标题'
              defaultValue={setting.title}
              onChange={(e) => setSetting({ ...setting, title: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author'>作 &nbsp;&nbsp; 者</Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              defaultValue={setting.author}
              onChange={(e) => setSetting({ ...setting, author: e.target.value })}
            />
          </div>
          <div className='flex w-full 2xl:w-1/2 space-x-1.5 mb-4 2xl:mr-2'>
            <Label htmlFor='author'>图 &nbsp;&nbsp; 标</Label>
            <IconSelect onChange={(selectedOption) => setSetting({ ...setting, icon: selectedOption as IconOption })} />
          </div>
          <div className='flex w-full 2xl:w-auto 2xl:flex-1 space-x-1.5 mb-4'>
            <Label htmlFor='font'>字 &nbsp;&nbsp; 体</Label>
            <Select defaultValue={setting.font.value} onValueChange={changeFont}>
              <SelectTrigger id='font' className='flex-1 mr-0 overflow-hidden'>
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
          <div className='flex w-full xl:w-1/2 space-x-1.5 mb-4 xl:mr-2'>
            <Label htmlFor='bg'>背景色</Label>
            <Input
              id='bg'
              type='color'
              className='flex-1 focus-visible:ring-1'
              placeholder='请选择背景色'
              defaultValue={setting.color.bgColor}
              onChange={(e) => setSetting({ ...setting, color: { bgColor: e.target.value} })}
            />
          </div>
          <div className='flex w-full xl:w-auto xl:flex-1 space-x-1.5 mb-4'>
            <Label htmlFor='pattern'>纹 &nbsp;&nbsp; 理</Label>
            <Select defaultValue={setting.pattern.value} onValueChange={changePattern}>
              <SelectTrigger id='pattern' className='flex-1 mr-0 overflow-hidden'>
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

        </div>
      </form>
    </div>
  )
}

export default EditorSetting
