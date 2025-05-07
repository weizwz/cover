'use client'

import React, { useEffect, useState } from 'react'
import Select, { OptionProps } from 'react-select'
import type { ActionMeta, MenuListProps, MultiValue, SingleValue } from 'react-select'
import { FixedSizeList as List } from 'react-window'
import { DEFAULT_ICON } from '../settings/default'

// 设置Iconify API的URL
const iconifyHost = process.env.NEXT_PUBLIC_API_ICONIFY_URL
const defaultIcon = DEFAULT_ICON

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
          <img loading='lazy' width={24} height={24} src={`${iconifyHost}/simple-icons/${data.value}.svg`} alt={`${data.label} icon`} />
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

const IconSelect = ({ onChange = (newValue?: SingleValue<IconOption> | MultiValue<IconOption>) => {} }) => {
  const [selectValue, setSelectValue] = useState<SingleValue<IconOption>>(defaultIcon)
  const [selectOptions, setSelectOptions] = useState([defaultIcon])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!iconifyHost) {
          throw new Error('Iconify API URL is not defined')
        }
        const response = await fetch(iconifyHost + '/collection?prefix=simple-icons&chars=true&aliases=true')
        const result = await response.json()

        const options = result.uncategorized.map((item: any) => ({
          value: item,
          label: item
        }))

        setSelectOptions([defaultIcon, ...options])
        setLoading(false)
      } catch (error) {
        console.error('The Iconify API call failed :', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (newValue: MultiValue<IconOption> | SingleValue<IconOption>, actionMeta: ActionMeta<IconOption>) => {
    setSelectValue(newValue as SingleValue<IconOption>)
    onChange(newValue)
  }

  if (loading) return <div className='flex-1 h-9 px-3 py-1 border border-input rounded-md'>图标加载中...</div>

  return (
    <Select
      className='react-select flex-1'
      value={selectValue}
      options={selectOptions}
      components={{ Option: CustomOption, MenuList: MenuList }}
      onChange={handleChange}
      placeholder='搜索图标'
      isSearchable={true}
      isClearable={false}
      styles={{
        menuList: (base) => ({ ...base, padding: 0 }),
        control: (provided, state) => ({
          ...provided,
          minHeight: '36px',
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
