'use client'

import React, { useContext, useEffect, useState } from 'react'
import Select, { OptionProps } from 'react-select'
import type { MenuListProps, MultiValue, SingleValue } from 'react-select'
import { FixedSizeList as List } from 'react-window'
import { CoverContext } from './coverContext'

// 设置Iconify API的URL
const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL

// 自定义label显示
const formatOptionLabel = ({ label }: { label: string }) => {
  return (
    <div className='flex items-center'>
      <span className='mr-2 overflow-hidden text-ellipsis'>{label}</span>
      <img className='w-6 h-6' loading='lazy' src={`${iconifyHost}/simple-icons/${label}.svg`} alt={`${label} icon`} />
    </div>
  )
}

// 自定义 Option 渲染组件
const CustomOption = ({ data, isFocused, isSelected, innerRef, innerProps }: OptionProps<IconOption>) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`p-2 ${isFocused || isSelected ? 'bg-gray-100' : ''}`}>
      <div className='flex items-center justify-between'>
        <span className='mr-2 overflow-hidden text-ellipsis'>{data.label}</span>
        <div className='ml-auto w-[24px]'>
          <img className='w-6 h-6' loading='lazy' src={`${iconifyHost}/simple-icons/${data.value}.svg`} alt={`${data.label} icon`} />
        </div>
      </div>
    </div>
  )
}

// 自定义 MenuList 渲染组件，使用 react-window 虚拟化
const MenuList = ({ options, children, maxHeight, getValue }: MenuListProps<IconOption>) => {
  const [value] = getValue()
  const [initialOffset, setInitialOffset] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const foundIndex = options.findIndex((option) => !('options' in option) && option.value === value?.value)
      setInitialOffset(foundIndex * 40) // 每项高度为 40
    }
  }, [options, value])

  return (
    <List height={maxHeight} width='100%' itemCount={options.length} itemSize={40} initialScrollOffset={initialOffset}>
      {({ index, style }) => (
        <div style={style}>
          {Array.isArray(children) &&
            React.isValidElement(children[index]) &&
            React.cloneElement(children[index], {
              key: index
            })}
        </div>
      )}
    </List>
  )
}

const IconSelect = (props: { onChange: (arg0: IconOption) => void }) => {
  const { coverSetting } = useContext(CoverContext)
  const [selectValue, setSelectValue] = useState<IconOption>(coverSetting.icon)
  const [selectOptions, setSelectOptions] = useState<IconOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!iconifyHost) {
          throw new Error('Iconify API URL is not defined')
        }
        const response = await fetch(iconifyHost + '/collection?prefix=simple-icons&chars=true&aliases=true')
        const result = await response.json()

        const options = result.uncategorized.map((item: SelectOption) => ({
          value: item,
          label: item
        }))

        setSelectOptions([coverSetting.icon, ...options])
        setLoading(false)
      } catch (error) {
        console.error('The Iconify API call failed :', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [coverSetting.icon])

  const handleChange = (newValue: MultiValue<IconOption> | SingleValue<IconOption>) => {
    setSelectValue(newValue as IconOption)
    props.onChange(newValue as IconOption)
  }

  if (loading) return <div className='flex-1 h-9 px-3 py-1 border border-input rounded-md'>图标加载中...</div>

  return (
    <Select
      className='react-select flex-1'
      value={selectValue}
      options={selectOptions}
      components={{ Option: CustomOption, MenuList: MenuList }}
      onChange={handleChange}
      formatOptionLabel={formatOptionLabel}
      placeholder='搜索图标'
      isSearchable={true}
      styles={{
        menuList: (base) => ({ ...base, padding: 0 }),
        control: (provided, state) => ({
          ...provided,
          minHeight: '36px',
          height: '36px',
          alignItems: 'flex-start',
          borderRadius: 'calc(var(--radius) - 2px)',
          backgroundColor: 'white',
          borderColor: state.isFocused || state.menuIsOpen ? 'var(--ring)' : 'var(--input)',
          boxShadow: state.isFocused || state.menuIsOpen ? '0 0 0 1px var(--input)' : '',
          ':hover': {
            borderColor: 'var(--input)',
            boxShadow: '',
          },
        })
      }}
    />
  )
}

export default IconSelect
