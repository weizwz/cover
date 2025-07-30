/**
 * 获取统一的背景样式
 */
export const getBackgroundStyle = (bg: Background): React.CSSProperties => {
  switch (bg.type) {
    case 'unsplash':
      if (bg.unsplashUrl) {
        return {
          backgroundImage: `url(${bg.unsplashUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }
      break
    case 'local':
      if (bg.image) {
        return {
          backgroundImage: `url(${bg.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }
      break
    case 'gradient':
      if (bg.gradient) {
        return {
          background: bg.gradient
        }
      }
      break
    case 'color':
    default:
      return {
        backgroundColor: bg.color
      }
  }
  
  return {
    backgroundColor: bg.color
  }
}

/**
 * 检查是否有背景图片
 */
export const hasBackgroundImage = (bg: Background): boolean => {
  return (bg.type === 'unsplash' && !!bg.unsplashUrl) || 
         (bg.type === 'local' && !!bg.image)
}

/**
 * 检查是否应该显示纹理
 * 只有纯色背景或渐变背景时才显示纹理
 */
export const shouldShowPattern = (bg: Background): boolean => {
  return bg.type === 'color' || (bg.type === 'gradient' && !!bg.gradient)
}