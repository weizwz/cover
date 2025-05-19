'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/img'
import CenteredAlert from './common/centeredAlert'

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [fontData, setFontData] = useState<FontData[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()

  // 初始化
  useEffect(() => {
    setFontData(groupWithTypeName(FONTS))
  }, [])

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

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
        showNotification({
          type: 'success',
          title: '设置已保存',
          message: '数据仅保存在本地浏览器中，请放心使用'
        })
      }).catch((err) => {
        showNotification({
          type: 'error',
          title: '设置保存失败',
          message: err
        })
      })
    } else {
      localStorage.setItem('coverSetting', JSON.stringify(coverSetting))
      showNotification({
        type: 'success',
        title: '设置已保存',
        message: '数据仅保存在本地浏览器中，请放心使用'
      })
    }
  }

  const resetSetting = () => {
    setCoverSetting({
      ...DEFAULT_SETTING,
      title: coverSetting.title,
      author: coverSetting.author,
      icon: coverSetting.icon,
      customIcon: coverSetting.customIcon,
    })
    showNotification({
      type: 'success',
      title: '样式已重置',
      message: '标题、作者、图标等信息不会被重置'
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(coverSetting.font.label, coverSetting.font.url)
  }, [coverSetting.font.label, coverSetting.font.url])

  return (
    <div className='h-full w-full overflow-y-auto py-4'>
      <h2 className='text-lg font-bold text-center mb-4'>基础配置</h2>
      <form className='pr-10'>
        <div className='flex w-full items-center flex-wrap gap-y-4'>
          <div className='flex w-full'>
            <Label htmlFor='title' className='w-16 justify-end mr-2'>
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
          <div className='flex w-full md:w-1/2 xl:w-full'>
            <Label htmlFor='author' className='w-16 justify-end mr-2'>
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
          <div className='flex w-full md:w-1/2 xl:w-full'>
            <Label className='w-16 justify-end mr-2'>图标</Label>
            <IconSelect onChange={changeIcon} />
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='font' className='w-16 justify-end mr-2'>
              字体
            </Label>
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
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='pattern' className='w-16 justify-end mr-2'>
              纹理
            </Label>
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
          <div className='flex w-full'>
            <Label htmlFor='bg' className='w-16 justify-end mr-2'>
              背景
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
          <div className='flex w-full'>
            <Label htmlFor='size' className='w-16 justify-end mr-2'>
              尺寸
            </Label>
            <Select
              value={coverSetting.size.value}
              onValueChange={(value) => {
                changeValue(value, 'size', SIZES)
              }}>
              <SelectTrigger id='size' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择宽高比例' />
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
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              格式
            </Label>
            <Select
              value={coverSetting.download}
              onValueChange={(value) => {
                setCoverSetting({ ...coverSetting, download: value as DownloadType })
              }}>
              <SelectTrigger id='download' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择输出文件格式' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem key='png' value='png'>
                  PNG
                </SelectItem>
                <SelectItem key='jpg' value='jpg'>
                  JPG
                </SelectItem>
                <SelectItem key='webp' value='webp'>
                  WEBP
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              输出比
            </Label>
            <div className='h-9 flex-1 flex items-center gap-2 border border-input rounded-md shadow-xs px-2'>
              <Slider
                id='download'
                className='flex-1'
                value={[coverSetting.scale]}
                min={0.5}
                max={5}
                step={0.5}
                onValueChange={(newValue) => setCoverSetting({ ...coverSetting, scale: newValue[0] })}
              />
              <div className='nowrap text-sm'>{coverSetting.scale} 倍</div>
            </div>
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
      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </div>
  )
}

export default EditorSetting
