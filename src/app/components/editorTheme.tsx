'use client'

import { useContext } from 'react'
import Image from 'next/image';
import { CoverContext } from './coverContext'
import { THEMES } from '../settings/themes'

const EditorTheme = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  const changeTheme = (value: string) => {
    const selectedOption = THEMES.filter((item) => {
      return item.value === value
    })
    setCoverSetting({
      ...coverSetting,
      theme: selectedOption[0]
    })
  }

  return (
    <div className='h-full w-full overflow-y-auto p-4'>
      <h2 className='text-lg font-bold text-center mb-4'>主题选择</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-1 2xl:grid-cols-2 gap-4'>
        {THEMES.map((item) => (
          <div
            className={`${
              item.value === coverSetting.theme.value ? 'border-gray-400 shadow-sm shadow-indigo-600/50' : ''
            } flex flex-col items-center justify-center border border-gray-200 p-1 overflow-hidden rounded-lg cursor-pointer border-hover duration-100`}
            key={item.label}>
            <Image src={item.preview.src} width={100} height={60} alt={item.label} onClick={() => changeTheme(item.value)} />
            <div className='text-sm text-center text-gray-600 font-bold whitespace-nowrap'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditorTheme
