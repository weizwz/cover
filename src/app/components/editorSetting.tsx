'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle, RotateCcw, Save, Shuffle } from 'lucide-react'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/utils'
import CenteredAlert from './common/centeredAlert'
import IconSelect from './iconSelect'
import BackgroundSelect from './backgroundSelect'

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
    const promises = []
    const settingToSave = { ...coverSetting }

    // 处理自定义图标
    if (coverSetting.customIcon) {
      promises.push(
        imgToBase64(coverSetting.customIcon).then((res) => {
          settingToSave.customIcon = 'data:image/png;base64,' + res
        })
      )
    }

    // 处理背景图片
    if (coverSetting.bg.type === 'local' && coverSetting.bg.image) {
      promises.push(
        imgToBase64(coverSetting.bg.image).then((res) => {
          settingToSave.bg.image = 'data:image/png;base64,' + res
        })
      )
    }

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
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
      localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
      showNotification({
        type: 'success',
        title: '配置已保存',
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
      bg: { ...DEFAULT_SETTING.bg }
    })
    showNotification({
      type: 'success',
      title: '样式已重置',
      message: '标题、作者、图标等信息不会被重置'
    })
  }

  const clearLocalSetting = () => {
    localStorage.setItem('coverSetting', JSON.stringify(DEFAULT_SETTING))
    showNotification({
      type: 'success',
      title: '保存配置已清除',
      message: '刷新页面或下次进入网站后生效'
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(coverSetting.font.label, coverSetting.font.url)
  }, [coverSetting.font.label, coverSetting.font.url])

  const randomSetting = () => {
    import('../settings/colorsRandom').then(({ BACKGROUNDS_RANDOM }) => {
      const randomBg = BACKGROUNDS_RANDOM[Math.floor(Math.random() * BACKGROUNDS_RANDOM.length)]
      const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)]
      const randomPattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)]
      setCoverSetting({
        ...coverSetting,
        bg: { ...randomBg },
        font: randomFont,
        pattern: randomPattern,
        bgBlur: Math.floor(Math.random() * 20),
        bgGrayscale: Math.floor(Math.random() * 5) * 20
      })
    })
  }

  return (
    <div className='flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant relative'>
      <div className='flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6 pb-24'>
        <div>
          <h2 className='text-lg font-bold text-primary text-center'>基础配置</h2>
        </div>

        {/* 基础信息 */}
        <div className='bg-white rounded-xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='title' className='text-xs font-semibold uppercase tracking-wider text-outline'>
              标题
            </Label>
            <Textarea
              id='title'
              className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all resize-none'
              rows={2}
              placeholder='请输入封面标题'
              value={coverSetting.title}
              onChange={(e) => setCoverSetting({ ...coverSetting, title: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='author' className='text-xs font-semibold uppercase tracking-wider text-outline'>
              作者
            </Label>
            <Input
              id='author'
              className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all'
              placeholder='请输入作者'
              value={coverSetting.author}
              onChange={(e) => setCoverSetting({ ...coverSetting, author: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='font' className='text-xs font-semibold uppercase tracking-wider text-outline'>
              字体
            </Label>
            <Select
              value={coverSetting.font.value}
              onValueChange={(value) => {
                changeValue(value, 'font', FONTS)
              }}>
              <SelectTrigger
                id='font'
                className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all'>
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
        </div>

        {/* 图形设置 */}
        <div className='bg-white rounded-xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-outline'>图标</Label>
            <IconSelect />
          </div>
          <div className='flex flex-col gap-1'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-outline'>背景</Label>
            <BackgroundSelect />
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Label htmlFor='pattern' className='text-xs font-semibold uppercase tracking-wider text-outline'>
                背景纹理
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className='w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>纹理仅在纯色/渐变背景下生效</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={coverSetting.pattern.value}
              onValueChange={(value) => {
                changeValue(value, 'pattern', PATTERNS)
              }}>
              <SelectTrigger
                id='pattern'
                className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all'>
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
          <div className='flex flex-col gap-1'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-outline flex justify-between'>
              <span>背景模糊</span>
              <span className='text-primary'>{coverSetting.bgBlur ?? 0}</span>
            </Label>
            <Slider
              value={[coverSetting.bgBlur ?? 0]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => setCoverSetting({ ...coverSetting, bgBlur: val[0] })}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-outline flex justify-between'>
              <span>背景灰度</span>
              <span className='text-primary'>{coverSetting.bgGrayscale ?? 0}</span>
            </Label>
            <Slider
              value={[coverSetting.bgGrayscale ?? 0]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => setCoverSetting({ ...coverSetting, bgGrayscale: val[0] })}
            />
          </div>
        </div>

        {/* 导出选项 */}
        <div className='bg-white rounded-xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='size' className='text-xs font-semibold uppercase tracking-wider text-outline'>
              尺寸
            </Label>
            <Select
              value={coverSetting.size.value}
              onValueChange={(value) => {
                changeValue(value, 'size', SIZES)
              }}>
              <SelectTrigger
                id='size'
                className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all'>
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
          <div className='flex flex-col gap-1'>
            <Label htmlFor='download' className='text-xs font-semibold uppercase tracking-wider text-outline'>
              格式
            </Label>
            <Select
              value={coverSetting.download}
              onValueChange={(value) => {
                setCoverSetting({ ...coverSetting, download: value as DownloadType })
              }}>
              <SelectTrigger
                id='download'
                className='w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all'>
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
          <div className='flex flex-col gap-1'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-outline flex justify-between'>
              <span>缩放倍率</span>
              <span className='text-primary'>{coverSetting.scale}x</span>
            </Label>
            <Slider
              value={[coverSetting.scale]}
              min={1}
              max={5}
              step={0.5}
              onValueChange={(newValue) => setCoverSetting({ ...coverSetting, scale: newValue[0] })}
            />
          </div>
        </div>

        <div className='flex justify-end pr-2'>
          <span className='text-sm underline cursor-pointer text-outline hover:text-primary' onClick={clearLocalSetting}>
            清除已保存配置
          </span>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 w-full flex justify-center gap-4 bg-white/80 backdrop-blur-md border-t border-outline-variant/30 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
        <Button className='cursor-pointer' onClick={saveSetting}>
          <Save className='w-4 h-4 hidden md:block' />
          保存
        </Button>
        <Button className='cursor-pointer' variant='outline' onClick={randomSetting}>
          <Shuffle className='w-4 h-4 hidden md:block' />
          随机
        </Button>
        <Button className='cursor-pointer' variant='outline' onClick={resetSetting}>
          <RotateCcw className='w-4 h-4 hidden md:block' />
          重置
        </Button>
      </div>

      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </div>
  )
}

export default EditorSetting
