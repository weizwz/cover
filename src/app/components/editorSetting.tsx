'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Check } from 'lucide-react'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/img'

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [fontData, setFontData] = useState<FontData[]>([])
  const [showAlert, setShowAlert] = useState(false)

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
        }
      }
      acc[item.type].list.push(item)
      return acc
    }, {})

    return Object.values(grouped)
  }

  const changeIcon = (option: IconOption) => {
    setCoverSetting({
      ...coverSetting,
      icon: option
    })
  }

  type changeOptions = Font | Pattern | Size
  const changeValue = (value: string, key: string, array: changeOptions[]) => {
    const selectedOption = array.filter((item) => {
      return item.value === value
    })
    setCoverSetting({
      ...coverSetting,
      [key]: selectedOption[0]
    })
  }

  const saveSetting = () => {
    if (coverSetting.customIcon) {
      //转为base64
      imgToBase64(coverSetting.customIcon).then((res) => {
        coverSetting.customIcon = 'data:image/png;base64,' + res
        localStorage.setItem('coverSetting', JSON.stringify(coverSetting))
      })
    } else {
      localStorage.setItem('coverSetting', JSON.stringify(coverSetting))
    }
    setShowAlert(true)
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showAlert])

  const resetSetting = () => {
    setCoverSetting({
      ...DEFAULT_SETTING,
      title: coverSetting.title,
      author: coverSetting.author,
      icon: coverSetting.icon,
      customIcon: coverSetting.customIcon
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
            <Label htmlFor='title' className='w-12 justify-end'>
              标题
            </Label>
            <Textarea
              id='title'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入封面标题'
              value={coverSetting.title}
              onChange={(e) => setCoverSetting({ ...coverSetting, title: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label htmlFor='author' className='w-12 justify-end'>
              作者
            </Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              value={coverSetting.author}
              onChange={(e) => setCoverSetting({ ...coverSetting, author: e.target.value })}
            />
          </div>
          <div className='flex w-full space-x-1.5 mb-4'>
            <Label className='w-12 justify-end'>图标</Label>
            <IconSelect onChange={changeIcon} />
          </div>
          <div className='flex w-full 2xl:w-1/2 2xl:pr-2 space-x-1.5 mb-4'>
            <Label className='w-12 justify-end'>字体</Label>
            <Select
              value={coverSetting.font.value}
              onValueChange={(value) => {
                changeValue(value, 'font', FONTS)
              }}>
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
            <Label htmlFor='bg' className='w-12 justify-end'>
              背景色
            </Label>
            <Input
              id='bg'
              type='color'
              className='flex-1 focus-visible:ring-1'
              placeholder='请选择背景色'
              value={coverSetting.color.bgColor}
              onChange={(e) => setCoverSetting({ ...coverSetting, color: { bgColor: e.target.value } })}
            />
          </div>
          <div className='flex w-full 2xl:w-1/2 2xl:pr-2 space-x-1.5 mb-4'>
            <Label className='w-12 justify-end'>纹理</Label>
            <Select
              value={coverSetting.pattern.value}
              onValueChange={(value) => {
                changeValue(value, 'pattern', PATTERNS)
              }}>
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
            <Label className='w-12 justify-end'>尺寸</Label>
            <Select
              value={coverSetting.size.value}
              onValueChange={(value) => {
                changeValue(value, 'size', SIZES)
              }}>
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
      <div className='flex justify-center items-center p-4'>
        <Button className='cursor-pointer mr-4' onClick={saveSetting}>
          保存
        </Button>
        <Button className='cursor-pointer' variant='outline' onClick={resetSetting}>
          重置
        </Button>
      </div>
      {showAlert && (
        <Alert className='fixed z-50 w-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Check className='h-4 w-4' />
          <AlertTitle>保存成功!</AlertTitle>
          <AlertDescription>当前数据仅保存在浏览器中，请放心使用</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default EditorSetting
