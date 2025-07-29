'use client'

import React, { useContext, useState } from 'react'
import { Check } from 'lucide-react'
import { CoverContext } from './coverContext'
import { GRADIENT_COLORS, COLOR_KEYS } from '../settings/gradients'

interface GradientSelectProps {
  onGradientSelect?: () => void
}

const GradientSelect: React.FC<GradientSelectProps> = ({ onGradientSelect }) => {
  const { coverSetting, setCoverSetting, selectedGradientColorKey, setSelectedGradientColorKey } = useContext(CoverContext)

  const selectGradient = (gradient: string) => {
    setCoverSetting({
      ...coverSetting,
      bg: {
        ...coverSetting.bg,
        type: 'gradient',
        image: undefined,
        unsplashUrl: undefined,
        gradient
      }
    })

    if (onGradientSelect) {
      onGradientSelect()
    }
  }

  const currentGradients = GRADIENT_COLORS[selectedGradientColorKey]?.gradients || []

  return (
    <div className='ignore w-full flex-1 flex flex-col overflow-hidden'>
      {/* 颜色过滤器 */}
      <div className='flex flex-wrap gap-2 justify-center'>
        {COLOR_KEYS.map((colorKey) => {
          const colorData = GRADIENT_COLORS[colorKey]
          const isSelected = selectedGradientColorKey === colorKey

          return (
            <button
              key={colorKey}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedGradientColorKey(colorKey)}>
              {colorData.name}
            </button>
          )
        })}
      </div>

      {/* 渐变色网格 */}
      <div className='flex-1 pt-4 overflow-y-auto'>
        <div className='grid grid-cols-3 xl:grid-cols-4 gap-4'>
          {currentGradients.map((gradient, index) => {
            const isSelected = coverSetting.bg.type === 'gradient' && coverSetting.bg.gradient === gradient.value

            return (
              <div
                key={index}
                className={`group flex items-center justify-center relative cursor-pointer rounded-xl aspect-[4/3]`}
                style={{ background: gradient.value }}
                onClick={() => selectGradient(gradient.value)}>
                {/* 选中状态 */}
                {isSelected && (
                  <div className='absolute right-4 top-4 w-6 h-6 bg-indigo-600 flex items-center justify-center rounded-full'>
                    <Check className='w-4 h-4 text-white' />
                  </div>
                )}

                {/* 悬停效果 */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800'>
                    点击选择
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GradientSelect
