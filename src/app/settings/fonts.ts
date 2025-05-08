export const FONTS: Font[] = [
  {
    label: '系统默认',
    value: 'font-default',
    url: ''
  },
  {
    label: '思源黑体',
    value: 'font-syht',
    url: 'https://fontsapi.zeoseven.com/69/main/result.css'
  },
  {
    label: '更纱黑体',
    value: 'font-gsht',
    url: 'https://fontsapi.zeoseven.com/207/main/result.css'
  },
  {
    label: '霞鹜新晰黑',
    value: 'font-xwxxh',
    url: 'https://fontsapi.zeoseven.com/19/main/result.css'
  },
  {
    label: '思源宋体',
    value: 'font-syst',
    url: 'https://fontsapi.zeoseven.com/562/main/result.css'
  },
  {
    label: '朱雀仿宋',
    value: 'font-zqfs',
    url: 'https://fontsapi.zeoseven.com/7/main/result.css'
  },
  {
    label: '霞鹜文楷',
    value: 'font-xwwk',
    url: 'https://fontsapi.zeoseven.com/95/main/result.css'
  },
  {
    label: '澳声通拼音文楷',
    value: 'font-astpywk',
    lineHeight: 'leading-[1.5]',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/ToneOZ-Pinyin-WenKai/dist/ToneOZ-Pinyin-WenKai-Bold/result.css'
  },
  {
    label: '润植家如印奏章楷',
    value: 'font-rzjryzzk',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/rzjryzzk/dist/nzgrRuYinZouZhangKai/result.css'
  },
  {
    label: '得意黑',
    value: 'font-dyh',
    url: 'https://fontsapi.zeoseven.com/92/main/result.css'
  },
  {
    label: '抖音美好体',
    value: 'font-dymht',
    url: 'https://fontsapi.zeoseven.com/84/main/result.css'
  },
  {
    label: '江城圆体',
    value: 'font-jcyt',
    url: 'https://fontsapi.zeoseven.com/59/main/result.css'
  },
  {
    label: '寒蝉全圆体',
    value: 'font-hcqyt',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/hcqyt/dist/ChillRoundFBold/result.css'
  },
  {
    label: 'Maple Mono',
    value: 'font-mm',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-SemiBold/result.css'
  },
  {
    label: '霞鹜漫黑',
    value: 'font-xwmh',
    url: 'https://fontsapi.zeoseven.com/134/main/result.css'
  },
  {
    label: '游趣体',
    value: 'font-yqt',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/yqt/dist/ChildFunSans-Demo/result.css'
  },
  {
    label: '云峰飞云体',
    value: 'font-yffyt',
    url: 'https://fontsapi.zeoseven.com/446/main/result.css'
  },
  {
    label: '也字工厂小石头',
    value: 'font-yzgcxst',
    url: 'https://chinese-fonts-cdn.deno.dev/packages/yzgcxst/dist/%E4%B9%9F%E5%AD%97%E5%B7%A5%E5%8E%82%E5%B0%8F%E7%9F%B3%E5%A4%B4/result.css'
  },
]

class FontLoader {
  private loadedFonts: Set<string>;

  constructor() {
    this.loadedFonts = new Set()
  }

  /**
   * 动态加载字体
   * @param {string} fontFamily 字体名称
   * @param {string} fontUrl 字体的CSS文件URL
   */
  loadFont(fontFamily: string, fontUrl?: string) {
    if (!fontUrl) {
      return
    }
    // 检查字体是否已经加载过
    if (this.loadedFonts.has(fontFamily)) {
      return Promise.resolve()
    }
    // 创建 link 元素
    const linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.href = fontUrl
    // 添加到 head 中
    document.head.appendChild(linkElement)
    // 记录已加载的字体
    this.loadedFonts.add(fontFamily)

    // 返回一个 promise，监听字体加载完成事件
    return document.fonts.ready
      .then(() => {
        console.log(`${fontFamily} 字体加载完成`)
      })
      .catch((error) => {
        console.error(`加载 ${fontFamily} 字体时出错:`, error)
      })
  }
}

export const fontLoader = new FontLoader()
