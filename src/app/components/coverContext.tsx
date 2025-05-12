'use client'

import React, { createContext, useState } from 'react'
import { DEFAULT_SETTING, DEFAULT_UNSPLASH_PARAM } from '../settings/default'

const CoverContext = createContext<CoverContextType>({
  coverSetting: DEFAULT_SETTING,
  setCoverSetting: () => {},
  unsplashParam: DEFAULT_UNSPLASH_PARAM,
  setUnsplashParam: () => {}
})

const CoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coverSetting, setCoverSetting] = useState(DEFAULT_SETTING)
  const [unsplashParam, setUnsplashParam] = useState(DEFAULT_UNSPLASH_PARAM)

  return <CoverContext.Provider value={{ coverSetting, setCoverSetting, unsplashParam, setUnsplashParam }}>{children}</CoverContext.Provider>
}

export { CoverProvider, CoverContext }
