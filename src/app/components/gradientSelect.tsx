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
    <div className="ignore flex w-full flex-1 flex-col overflow-hidden">
      {/* 颜色过滤器 */}
      <div className="flex flex-wrap justify-center gap-2">
        {COLOR_KEYS.map((colorKey) => {
          const colorData = GRADIENT_COLORS[colorKey]
          const isSelected = selectedGradientColorKey === colorKey

          return (
            <button
              key={colorKey}
              className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 ${
                isSelected ? 'bg-primary text-white shadow-md' : 'border border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedGradientColorKey(colorKey)}
            >
              {colorData.name}
            </button>
          )
        })}
      </div>

      {/* 渐变色网格 */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {currentGradients.map((gradient, index) => {
            const isSelected = coverSetting.bg.type === 'gradient' && coverSetting.bg.gradient === gradient.value

            return (
              <div
                key={index}
                className={`group relative flex aspect-4/3 cursor-pointer items-center justify-center rounded-xl`}
                style={{ background: gradient.value }}
                onClick={() => selectGradient(gradient.value)}
              >
                {/* 选中状态 */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GradientSelect
