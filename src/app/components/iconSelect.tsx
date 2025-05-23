'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { CoverContext } from './coverContext'
import { throttle } from '../tools/utils'

// 设置Iconify API的URL
const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

// 自定义label显示
const FormatOptionLabel = ({ icon }: { icon: IconOption }) => {
  return (
    <div className='flex items-center'>
      <img className='w-6 h-6 mr-2' loading='lazy' src={icon.label === '本地图标' ? icon.value : `${iconifyHost}/${icon.value}.svg`} alt={`${icon.label} icon`} />
      <span className='overflow-hidden text-ellipsis'>{icon.label}</span>
    </div>
  )
}

const IconSelect = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [selectItem, setSelectItem] = useState<IconOption>(coverSetting.icon)
  const [query, setQuery] = useState(coverSetting.icon.label)
  const [options, setOptions] = useState<IconOption[]>([])

  // 初始化
  useEffect(() => {
    if (coverSetting.customIcon) {
      setSelectItem({ value: coverSetting.customIcon, label: '本地图标' })
      setOptions([{ value: coverSetting.customIcon, label: '本地图标' }])
      setLoading(false)
      setQuery('')
      return
    }
    fetchSearchResults(coverSetting.icon.label)
  }, [])

  const selectHandle = (value: string) => {
    const selectedOption = options.find((item: IconOption) => item.value === value)
    setSelectItem(selectedOption as IconOption)
    setCoverSetting({ ...coverSetting, icon: selectedOption as IconOption, customIcon: '' })
    setOpen(false)
  }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query)
    // 发起远程搜索请求
    throttledFetchSearchResults(query)
  }

  // 上传图标
  const handleCustomIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const customIcon = URL.createObjectURL(e.target.files[0])
      setSelectItem({ value: customIcon, label: '本地图标' })
      setOptions([{ value: customIcon, label: '本地图标' }])
      setCoverSetting({ ...coverSetting, customIcon })
      setQuery('')
    }
  }

  // 节流函数
  const throttledFetchSearchResults = throttle(async (query: string) => {
    await fetchSearchResults(query)
  }, 300)
  // 发起远程搜索请求
  const fetchSearchResults = async (query: string) => {
    try {
      if (!iconifyHost) {
        throw new Error('Iconify API URL is not defined')
      }
      if (query.trim() === '') {
        return
      }
      const response = await fetch(iconifyHost + `/search?query=${query}&limit=100`)
      const result = await response.json()

      const options: IconOption[] = result.icons.map((item: string) => ({
        value: item,
        label: item.split(':')[1]
      }))

      setOptions([...options])
      setLoading(false)
    } catch (error) {
      console.error('The Iconify API call failed :', error)
      setOptions([coverSetting.icon])
      setLoading(false)
    }
  }

  if (loading) return <div className='flex-1 h-9 px-3 py-2 border border-input rounded-md text-sm'>图标加载中...</div>

  return (
    <div className='flex-1 flex items-center justify-between gap-2 overflow-hidden'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='flex-1 justify-between'>
            <FormatOptionLabel icon={selectItem} />
            <ChevronDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0'>
          <Command>
            <CommandInput value={query} placeholder='请搜索图标' className='h-9' onInput={handleInputChange} />
            <CommandList>
              <CommandEmpty>未找到相关图标</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={selectHandle} className='w-full flex items-center justify-between'>
                    <FormatOptionLabel icon={item} />
                    <Check className={selectItem.value === item.value ? 'opacity-100' : 'opacity-0'} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className='h-full w-15 relative overflow-hidden'>
        <Input
          type='file'
          accept='image/png, image/jpeg, image/webp'
          className='absolute h-full w-fit right-0 top-0 opacity-0 cursor-pointer'
          onChange={handleCustomIconChange}
        />
        <Button className='cursor-pointer pointer-events-none'>上传</Button>
      </div>
    </div>
  )
}

export default IconSelect
