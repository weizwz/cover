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
      bg: { ...DEFAULT_SETTING.bg },
      bgBlur: coverSetting.bgBlur,
      bgGrayscale: coverSetting.bgGrayscale
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
        bgBlur: Math.floor(Math.random() * 10),
        bgGrayscale: Math.floor(Math.random() * 10)
      })
    })
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto px-8 py-6 pb-24">
        <div>
          <h2 className="text-primary text-center text-lg font-bold">基础配置</h2>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            标题
          </Label>
          <Textarea
            id="title"
            className="focus-visible:ring-primary focus-visible:border-primary w-full resize-none rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
            rows={2}
            placeholder="请输入封面标题"
            value={coverSetting.title}
            onChange={(e) => setCoverSetting({ ...coverSetting, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="author" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            作者
          </Label>
          <Input
            id="author"
            className="focus-visible:ring-primary focus-visible:border-primary w-full rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
            placeholder="请输入作者"
            value={coverSetting.author}
            onChange={(e) => setCoverSetting({ ...coverSetting, author: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">图标</Label>
          <IconSelect />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="size" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            尺寸
          </Label>
          <Select
            value={coverSetting.size.value}
            onValueChange={(value) => {
              changeValue(value, 'size', SIZES)
            }}
          >
            <SelectTrigger
              id="size"
              className="focus-visible:ring-primary focus-visible:border-primary w-full rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
            >
              <SelectValue placeholder="请选择宽高比例" />
            </SelectTrigger>
            <SelectContent position="popper">
              {SIZES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            <Label htmlFor="font" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
              字体
            </Label>
            <Select
              value={coverSetting.font.value}
              onValueChange={(value) => {
                changeValue(value, 'font', FONTS)
              }}
            >
              <SelectTrigger
                id="font"
                className="focus-visible:ring-primary focus-visible:border-primary w-full rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
              >
                <SelectValue placeholder="请选择字体" />
              </SelectTrigger>
              <SelectContent position="popper">
                {fontData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className="text-primary font-bold">{item.typeName}</SelectLabel>
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
          <div className="flex w-1/2 flex-col gap-1">
            <div className="flex items-center gap-1">
              <Label htmlFor="pattern" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                纹理
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 cursor-help text-gray-400 hover:text-gray-600" />
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
              }}
            >
              <SelectTrigger
                id="pattern"
                className="focus-visible:ring-primary focus-visible:border-primary w-full rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
              >
                <SelectValue placeholder="请选择纹理" />
              </SelectTrigger>
              <SelectContent position="popper">
                {patternData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className="text-primary font-bold">{item.typeName}</SelectLabel>
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
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">背景</Label>
          <BackgroundSelect />
        </div>
        <div className="mb-1 flex flex-col gap-1">
          <Label className="flex justify-between text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            <span>背景模糊</span>
            <span className="text-primary">{coverSetting.bgBlur ?? 0}</span>
          </Label>
          <Slider value={[coverSetting.bgBlur ?? 0]} min={0} max={100} step={1} onValueChange={(val) => setCoverSetting({ ...coverSetting, bgBlur: val[0] })} />
        </div>
        <div className="mb-1 flex flex-col gap-1">
          <Label className="flex justify-between text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            <span>背景灰度</span>
            <span className="text-primary">{coverSetting.bgGrayscale ?? 0}</span>
          </Label>
          <Slider
            value={[coverSetting.bgGrayscale ?? 0]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => setCoverSetting({ ...coverSetting, bgGrayscale: val[0] })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="download" className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            图片格式
          </Label>
          <Select
            value={coverSetting.download}
            onValueChange={(value) => {
              setCoverSetting({ ...coverSetting, download: value as DownloadType })
            }}
          >
            <SelectTrigger
              id="download"
              className="focus-visible:ring-primary focus-visible:border-primary w-full rounded-lg bg-indigo-50/50 p-3 text-sm transition-all focus-visible:ring-2"
            >
              <SelectValue placeholder="请选择输出文件格式" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem key="png" value="png">
                PNG
              </SelectItem>
              <SelectItem key="jpg" value="jpg">
                JPG
              </SelectItem>
              <SelectItem key="webp" value="webp">
                WEBP
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="flex justify-between text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            <span>缩放倍率</span>
            <span className="text-primary">{coverSetting.scale}x</span>
          </Label>
          <Slider
            value={[coverSetting.scale]}
            min={1}
            max={5}
            step={0.5}
            onValueChange={(newValue) => setCoverSetting({ ...coverSetting, scale: newValue[0] })}
          />
        </div>

        <div className="flex justify-end pr-2">
          <span className="hover:text-primary cursor-pointer text-sm text-neutral-500 underline" onClick={clearLocalSetting}>
            清除已保存配置
          </span>
        </div>
      </div>

      <div className="border-border absolute bottom-0 left-0 z-50 flex w-full justify-center gap-4 border-t bg-white/80 p-4 backdrop-blur-md">
        <Button className="cursor-pointer" onClick={saveSetting}>
          <Save className="hidden h-4 w-4 md:block" />
          保存
        </Button>
        <Button className="cursor-pointer" variant="outline" onClick={randomSetting}>
          <Shuffle className="hidden h-4 w-4 md:block" />
          随机
        </Button>
        <Button className="cursor-pointer" variant="outline" onClick={resetSetting}>
          <RotateCcw className="hidden h-4 w-4 md:block" />
          重置
        </Button>
      </div>

      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </div>
  )
}

export default EditorSetting
