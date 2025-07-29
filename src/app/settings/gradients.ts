// 主流渐变色配置 - 7种主色调，每种12个渐变
const GRADIENT_COLORS_CONFIG = {
  red: {
    name: '红色',
    gradients: [
      { value: 'linear-gradient(90deg, #ff6b6b 0%, #ffa8a8 100%)' }, // 红色到浅红
      { value: 'linear-gradient(220.55deg, #FF896D 0%, #D02020 100%)' }, // 红色到橙红
      { value: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)' },
      { value: 'linear-gradient(135deg, #ff3838 0%, #ff9ff3 100%)' }, // 红色到粉色
      { value: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)' }, // 红色到深红
      { value: 'radial-gradient(circle at 38% 45%, #ff416c 0%, #ff4b2b 100%)' },
      { value: 'linear-gradient(135deg, #ff5722 0%, #ffeb3b 100%)' }, // 红色到黄色
      { value: 'linear-gradient(135deg, #f44336 0%, #9c27b0 100%)' }, // 红色到紫色
      { value: 'linear-gradient(135deg, #ff1744 0%, #ff8a80 100%)' }, // 深红到浅红
      { value: 'linear-gradient(to right, #ee0979 0%, #ff6a00) 100%' }, // 暗红到粉红
      { value: 'linear-gradient(to right, #ff416c 0%, #ff4b2b) 100%' }, // 深红渐变
      { value: 'linear-gradient(220.55deg, #FF0000 0%, #470000 100%)' } // 最深红到亮红
    ]
  },
  orange: {
    name: '橙色',
    gradients: [
      { value: 'linear-gradient(135deg, #ff9500 0%, #ffad33 100%)' }, // 橙色到浅橙
      { value: 'linear-gradient(135deg, #ff6348 0%, #ffb347 100%)' }, // 橙红到橙黄
      { value: 'linear-gradient(220.55deg, #FFD439 0%, #FF7A00 100%)' }, // 橙色到黄色
      { value: 'linear-gradient(135deg, #ff7675 0%, #fdcb6e 100%)' }, // 橙粉到橙黄
      { value: 'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)' }, // 橙色到桃色
      { value: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)' }, // 粉橙到橙黄
      { value: 'linear-gradient(to right, #F29A4A 0%, #F2C84C 100%' }, // 橙色到蓝色
      { value: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)' }, // 橙红到橙色
      { value: 'linear-gradient(135deg, #ff5722 0%, #ff9800 100%)' }, // 深橙到橙色
      { value: 'linear-gradient(135deg, #ff8a65 0%, #ffcc02 100%)' }, // 浅橙到金黄
      { value: 'linear-gradient(135deg, #ff7043 0%, #ffab40 100%)' }, // 橙色渐变
      { value: 'linear-gradient(135deg, #D2923D 0%, #FDCE90 100%)' } // 深橙到亮橙
    ]
  },
  yellow: {
    name: '黄色',
    gradients: [
      { value: 'linear-gradient(to right, #ffe259 0%, #ffa751 100%)' }, // 黄色到橙黄
      { value: 'linear-gradient(135deg, #f7ff00 0%, #db36a4 100%)' }, // 黄色到橙色
      { value: 'radial-gradient(circle at 35% 50%, #f2ea18 0%, #f53a19 100%)' }, // 浅黄到桃色
      { value: 'linear-gradient(135deg, #fff200 0%, #ffaa00 100%)' }, // 亮黄到橙色
      { value: 'linear-gradient(135deg, #ffdd00 0%, #d8ffb8 100%)' }, // 黄色到橙色
      { value: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)' }, // 金黄到红橙
      { value: 'linear-gradient(135deg, #f9ca24 0%, #f0932b 100%)' }, // 黄色到橙色
      { value: 'linear-gradient(135deg, #ffdd59 0%, #ff6b6b 100%)' }, // 黄色到红色
      { value: 'radial-gradient(circle at 35% 50%, #f4ed15 0%, #d0f2a6 100%)' }, // 金黄到红色
      { value: 'radial-gradient(circle at 39% 47%, #f2ea18 0%, #f5af19 100%)' }, // 橙黄到橙红
      { value: 'linear-gradient(220.55deg, #FFF500 0%, #FFB800 100%)' }, // 黄色到紫色
      { value: 'linear-gradient(220.55deg, #FF7EC7 0%, #FFED46 100%)' } // 浅黄到蓝色
    ]
  },
  green: {
    name: '绿色',
    gradients: [
      { value: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)' }, // 绿色到青绿
      { value: 'linear-gradient(220.55deg, #FFEB3A 0%, #4DEF8E 100%)' }, // 蓝绿到深蓝
      { value: 'linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)' }, // 浅绿到粉色
      { value: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)' }, // 青绿到黄绿
      { value: 'linear-gradient(to top, #b3ffab 0%, #12fff7 100%)' }, // 蓝绿到紫色
      { value: 'linear-gradient(to top, #0fd850 0%, #f9f047 100%)' }, // 粉绿到粉红
      { value: 'linear-gradient(to top, #9be15d 0%, #00e3ae 100%)' }, // 蓝绿到青色
      { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }, // 绿色到青绿
      { value: 'linear-gradient(180deg, #2af598 0%, #009efd 100%)' }, // 粉绿到黄色
      { value: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)' }, // 青绿到蓝色
      { value: 'linear-gradient(to right, #03B099 0%, #94C83D 100%' }, // 浅绿到粉色
      { value: 'linear-gradient(220.55deg, #00B960 0%, #00552C 100%)' } // 绿粉到浅黄
    ]
  },
  blue: {
    name: '蓝色',
    gradients: [
      { value: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' }, // 浅蓝到蓝色
      { value: 'linear-gradient(to right, #0acffe 0%, #495aff 100%)' }, // 蓝紫到紫色
      { value: 'linear-gradient(220.55deg, #3793FF 0%, #0017E4 100%)' }, // 蓝粉到橙黄
      { value: 'linear-gradient(220.55deg, #7CF7FF 0%, #4B73FF 100%)' }, // 粉蓝到蓝色
      { value: 'linear-gradient(135deg, #00cec9 0%, #55a3ff 100%)' }, // 青蓝到蓝色
      { value: 'linear-gradient(220.55deg, #00E0EE 0%, #AD00FE 100%)' }, // 紫蓝到浅紫蓝
      { value: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' }, // 蓝色到粉色
      { value: 'radial-gradient(circle at 39% 40%, #4facfe 0%, #00f2fe 100%)' }, // 蓝色到绿色
      { value: 'linear-gradient(135deg, #3742fa 0%, #2f3542 100%)' }, // 蓝色到深灰
      { value: 'linear-gradient(135deg, #70a1ff 0%, #5352ed 100%)' }, // 浅蓝到紫蓝
      { value: 'linear-gradient(135deg, #3c40c6 0%, #0fbcf9 100%)' }, // 深蓝到青蓝
      { value: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)' } // 深蓝到浅灰
    ]
  },
  purple: {
    name: '紫色',
    gradients: [
      { value: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' }, // 浅紫到紫色
      { value: 'linear-gradient(135deg, #fd79a8 0%, #a29bfe 100%)' }, // 粉紫到浅紫
      { value: 'linear-gradient(135deg, #e84393 0%, #6c5ce7 100%)' }, // 粉红到紫色
      { value: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)' }, // 紫色到蓝色
      { value: 'linear-gradient(135deg, #9b59b6 0%, #e74c3c 100%)' }, // 紫色到红色
      { value: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)' }, // 蓝紫到深紫
      { value: 'linear-gradient(220.55deg, #B7DCFF 0%, #FFA4F6 100%)' }, // 粉紫到粉红
      { value: 'radial-gradient(circle at 35% 50%, #c861f5 0%, #db4d8a 100%)' }, // 蓝紫到青色
      { value: 'linear-gradient(135deg, #c749fd 0%, #ff2e89 100%)' }, // 紫绿到青绿
      { value: 'radial-gradient(circle at 35% 50%, #e93df5 0%, #ff2e89 100%)' }, // 紫粉到黄色
      { value: 'linear-gradient(220.55deg, #DD7BFF 0%, #FF6C6C 100%)' }, // 青紫到蓝色
      { value: 'radial-gradient(circle at 44% 50%, #834d9b 0%, #f86bff 100%)' } // 浅紫到粉色
    ]
  },
  gray: {
    name: '灰色',
    gradients: [
      { value: 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)' }, // 浅灰到深灰
      { value: 'linear-gradient(135deg, #ecf0f1 0%, #95a5a6 100%)' }, // 白灰到中灰
      { value: 'linear-gradient(135deg, #dae1e7 0%, #6c7b7f 100%)' }, // 浅灰到蓝灰
      { value: 'linear-gradient(135deg, #57606f 0%, #2f3542 100%)' }, // 中灰到深灰
      { value: 'linear-gradient(135deg, #a4b0be 0%, #57606f 100%)' }, // 浅灰到中灰
      { value: 'linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)' }, // 白灰到浅灰
      { value: 'radial-gradient(at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.03) 100%), linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(143,152,157,0.60) 100%)' }, // 中灰到深灰
      { value: 'radial-gradient(circle at 40% 50%, #c7c7c7 0%, #666666 100%)' }, // 浅灰到中灰
      { value: 'radial-gradient(circle at 35% 50%, #cccccc 0%, #243e42 100%)' }, // 蓝灰渐变
      { value: 'linear-gradient(135deg, #CAD6E2 0%, #E1E8F1 100%)' }, // 粉灰渐变
      { value: 'linear-gradient(135deg, #62748D 0%, #90A1B9 100%)' }, // 黄灰渐变
      { value: 'linear-gradient(135deg, #D4D4D9 0%, #99A1AE 100%)' } // 绿灰渐变
    ]
  }
}

// 生成渐变色
const generateGradients = () => {
  const gradients: { [key: string]: { name: string; gradients: Array<{ value: string }> } } = {}

  Object.entries(GRADIENT_COLORS_CONFIG).forEach(([colorKey, colorData]) => {
    gradients[colorKey] = {
      name: colorData.name,
      gradients: colorData.gradients
    }
  })

  return gradients
}

export const GRADIENT_COLORS = generateGradients()

export const COLOR_KEYS = Object.keys(GRADIENT_COLORS) as string[]
