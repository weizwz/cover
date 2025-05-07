'use client'

import { useContext, useState } from 'react'
import Image from 'next/image';
import { CoverContext } from './coverContext'
import { THEMES } from '../settings/themes'

const EditorTheme = () => {
  const { coverSetting } = useContext(CoverContext)
  const [setting, setSetting] = useState(coverSetting)

  const changeTheme = (value: string) => {
    const selectedOption = THEMES.filter((item) => {
      return item.value === value
    })
    setSetting({
      ...setting,
      theme: selectedOption[0]
    })
  }

  return (
    <div className='h-full w-full overflow-y-auto p-4'>
      <h2 className='text-lg font-bold text-center mb-4'>主题选择</h2>
      <div className='grid 2xl:grid-cols-2 gap-4'>
        {THEMES.map((item) => (
          <div
            className={`${
              item.value === setting.theme.value ? 'border-gray-400 shadow-md' : ''
            } flex flex-col items-center justify-center border border-gray-200 p-1 overflow-hidden rounded-lg cursor-pointer border-hover duration-100`}
            key={item.label}>
            <Image src={item.preview.src} width={100} height={60} alt={item.label} onClick={(e) => changeTheme(item.value)} />
            <div className='text-sm text-center text-gray-600 font-bold whitespace-nowrap'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditorTheme
