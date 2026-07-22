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
  return (bg.type === 'unsplash' && !!bg.unsplashUrl) || (bg.type === 'local' && !!bg.image)
}

/**
 * 检查是否应该显示纹理
 * 只有纯色背景或渐变背景时才显示纹理
 */
export const shouldShowPattern = (bg: Background): boolean => {
  return bg.type === 'color' || (bg.type === 'gradient' && !!bg.gradient)
}

/**
 * 将背景模糊均匀的分为100份
 */
export const getBlurScale = (blur: number): string => {
  const maxBlur = 50 // 最大模糊值
  const exponent = 2 // 缓动指数，可根据实际视觉效果微调（2为二次，3为三次）

  // 核心非线性映射公式
  const ratio = Math.min(Math.max(blur / 100, 0), 1)
  return (maxBlur * Math.pow(ratio, exponent)).toFixed(2)
}
