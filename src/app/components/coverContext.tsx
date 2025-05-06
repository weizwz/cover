import React, { createContext, useState } from 'react'
import { DEFAULT_SETTING, DEFAULT_UNSPLASH_PARAM } from '../settings/default'

const CoverContext = createContext<CoverContextType>({
  unsplashImage: DEFAULT_SETTING,
  setUnsplashImage: () => {},
  param: DEFAULT_UNSPLASH_PARAM,
  setParam: () => {}
});

const CoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState(DEFAULT_SETTING)
  const [param, setParam] = useState(DEFAULT_UNSPLASH_PARAM)

  return <CoverContext.Provider value={{ unsplashImage, setUnsplashImage, param, setParam }}>{children}</CoverContext.Provider>
}

export { CoverProvider, CoverContext }
