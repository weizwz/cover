'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/img'
import CenteredAlert from './common/centeredAlert'

const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [fontData, setFontData] = useState<GroupData[]>([])
  const [patternData, setPatternData] = useState<GroupData[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()

  // 初始化
  useEffect(() => {
    setFontData(groupWithTypeName(FONTS))
    setPatternData(groupWithTypeName(PATTERNS))
  }, [])

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  // 字体分组显示
  const groupWithTypeName = (items: GroupItem[]): GroupData[] => {
    const grouped = items.reduce<Record<string, GroupData>>((acc, item) => {
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
      imgToBase64(coverSetting.customIcon)
        .then((res) => {
          coverSetting.customIcon = 'data:image/png;base64,' + res
          localStorage.setItem('coverSetting', JSON.stringify(coverSetting))
          showNotification({
            type: 'success',
            title: '设置已保存',
            message: '数据仅保存在本地浏览器中，请放心使用'
          })
        })
        .catch((err) => {
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
      customIcon: coverSetting.customIcon
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
            {/* <IconSelect onChange={changeIcon} /> */}
            <div className='flex-1 flex items-center justify-between border rounded-md box-border shadow-xs bg-white text-sm overflow-hidden'>
              <div className='flex-1 h-full px-3 flex items-center overflow-hidden'>
                <span className='mr-2 overflow-hidden text-ellipsis'>{coverSetting.customIcon ? '本地图标' : coverSetting.icon.label}</span>
                {coverSetting.customIcon ? (
                  <img src={coverSetting.customIcon} className='w-6 h-6' loading='lazy' alt='custom icon' />
                ) : (
                  <img
                    className='w-6 h-6'
                    loading='lazy'
                    src={`${iconifyHost}/simple-icons/${coverSetting.icon.label}.svg`}
                    alt={`${coverSetting.icon.label} icon`}
                  />
                )}
              </div>
              <div className='flex h-full items-center'>
                <div className='w-18 relative'>
                  <Input
                    type='file'
                    accept='image/png, image/jpeg, image/webp'
                    className='cursor-pointer bg-none border-none'
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setCoverSetting({ ...coverSetting, customIcon: URL.createObjectURL(e.target.files[0]) })
                      }
                    }}
                  />
                  <div className='absolute w-full h-full left-0 top-0 bg-white px-2 cursor-default text-primary flex items-center pointer-events-none'>
                    上传图标
                  </div>
                </div>
                <div className='w-[1px] h-1/2 bg-gray-300' />
                <div className='h-full px-2 cursor-pointer text-primary flex items-center'>选择图标</div>
              </div>
            </div>
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
                {patternData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>{item.typeName}</SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem key={temp.value} value={temp.value}>
                        {temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
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
