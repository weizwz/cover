'use client'

import { useContext } from 'react'
import { Check } from 'lucide-react'
import { CoverContext } from './coverContext'
import { THEMES } from '../settings/themes'
import ThemePreview from './ThemePreview'

const EditorTheme = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto px-6 py-4">
      <h2 className="text-primary text-center text-lg font-bold">主题选择</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-1 2xl:grid-cols-2">
        {THEMES.map((item) => (
          <div
            className="flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg p-1"
            key={item.label}
            onClick={() => setCoverSetting({ ...coverSetting, theme: item })}
          >
            <div className="relative mb-1 flex h-full w-full flex-col items-center justify-between">
              {/* 选中状态 */}
              {item.value === coverSetting.theme.value && (
                <div className="bg-primary absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <ThemePreview theme={item.value} />
            </div>
            <div
              className={`text-center text-sm font-semibold whitespace-nowrap ${item.value === coverSetting.theme.value ? 'text-primary' : 'text-neutral-600'}`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditorTheme
