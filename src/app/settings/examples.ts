export const Examples = [
  {
    id: '1',
    name: '手机主题封面',
    preview: 'https://p.weizwz.com/cover/thiscover_example_1_2c9d37d69e1800f6.webp',
    ratio: '9/16',
    mark: '手机主题：使用吸色器取手机截图中的颜色',
    data: {
      title: '手机主题封面',
      author: '',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'streamline-block:devices-phone', label: 'devices-phone' },
      customIcon: '',
      theme: {
        label: '手机',
        value: 'mobile',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        },
        swapX: false,
        stretchY: true
      },
      font: { label: '系统默认', value: 'font-default', type: 'ht', typeName: '黑体', url: '' },
      bg: { color: '#3738a6', type: 'color' as const },
      pattern: { label: '无', value: 'none', type: 'basic', typeName: '基础' },
      size: { label: '竖向 2:3', value: 'vertical2-3' }
    }
  },

  {
    id: '2',
    name: '小红书主题封面',
    preview: 'https://p.weizwz.com/cover/thiscover_example_4_8e2644481e476e28.webp',
    ratio: '1',
    mark: '简洁主题：选择不同纹理&背景色',
    data: {
      title: '小红书主题封面',
      author: ' momo',
      download: 'png' as const,
      scale: 2,
      icon: { label: 'xiaohongshu', value: 'simple-icons:xiaohongshu' },
      customIcon: '',
      theme: {
        label: '简洁',
        value: 'outline',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        }
      },
      font: { label: '系统默认', value: 'font-default', type: 'ht', typeName: '黑体', url: '' },
      bg: { color: '#ff2442', type: 'color' as const },
      pattern: { label: '甜点', value: 'dessert', type: 'pattern', typeName: '图案', isOpacity: true },
      size: { label: '等比 1:1（小红书）', value: 'square vertical1-1 horizontal1-1' }
    }
  },
  {
    id: '3',
    name: '我的博客日常记录',
    preview: 'https://p.weizwz.com/cover/thiscover_example_2_1c118ab0f9fc93e0.webp',
    ratio: '16/9',
    mark: '背景主题：使用在线背景图片',
    data: {
      title: '我的博客日常记录',
      author: '唯知笔记',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'streamline-ultimate:content-pen-write', label: 'content-pen-write' },
      customIcon: '',
      theme: {
        label: '背景',
        value: 'background',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        }
      },
      font: { label: '抖音美好体', value: 'font-dymht', type: 'yt', typeName: '圆体', url: 'https://fontsapi.zeoseven.com/84/main/result.css' },
      bg: {
        color: '#a3b3ff',
        type: 'unsplash' as const,
        unsplashUrl:
          'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTQ0NTh8MHwxfHNlYXJjaHwxMnx8YmVhdXRpZnVsJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NTM2OTg0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      pattern: { label: '无', value: 'none', type: 'basic', typeName: '基础' },
      size: { label: '横向 16:9（头条、博客园、知乎等大多数文章封面）', value: 'horizontal16-9' }
    }
  },
  {
    id: '4',
    name: '我听见了海浪的呼唤',
    preview: 'https://p.weizwz.com/cover/thiscover_example_3_f41f7c9eb1e527a8.webp',
    ratio: '4/3',
    mark: '图文主题：左右位置可兑换',
    data: {
      title: '我听见了海浪的呼唤',
      author: '五一游记',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'tabler:train-filled', label: 'train-filled' },
      customIcon: '',
      theme: {
        label: '图文',
        value: 'stylish',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        },
        swapX: false
      },
      font: { label: '全字库正楷体', value: 'font-qzkzkt', type: 'kt', typeName: '楷体', url: 'https://fontsapi.zeoseven.com/36/main/result.css' },
      bg: {
        color: '#a3b3ff',
        type: 'unsplash' as const,
        unsplashUrl:
          'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTQ0NTh8MHwxfHNlYXJjaHwxMnx8c2VhJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NTM3OTk4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        gradient: 'radial-gradient(circle at 38% 45%, #ff416c 0%, #ff4b2b 100%)'
      },
      pattern: { label: '无', value: 'none', type: 'basic', typeName: '基础' },
      size: { label: '横向 4:3（小红书横板）', value: 'horizontal4-3' }
    }
  },
  {
    id: '5',
    name: '桌面主题预览',
    preview: 'https://p.weizwz.com/cover/thiscover_example_5_1e1feb39361e31ca.webp',
    ratio: '4/3',
    mark: '桌面主题：使用桌面截图和渐变背景',
    data: {
      title: '桌面主题预览',
      author: 'weizwz.com',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'mynaui:desktop', label: 'desktop' },
      customIcon: '',
      theme: {
        label: '桌面',
        value: 'preview',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        },
        stretchY: false
      },
      font: { label: '系统默认', value: 'font-default', type: 'ht', typeName: '黑体', url: '' },
      bg: { color: '#a3b3ff', type: 'gradient' as const, gradient: 'linear-gradient(135deg, #62748D 0%, #90A1B9 100%)' },
      pattern: { label: '甜点', value: 'dessert', type: 'pattern', typeName: '图案', isOpacity: true },
      size: { label: '横向 4:3（小红书横板）', value: 'horizontal4-3' }
    }
  },
  {
    id: '6',
    name: '数学课学习笔记 2025年6月20日',
    preview: 'https://p.weizwz.com/cover/thiscover_example_6_92b78a7283d015eb.webp',
    ratio: '1',
    mark: '现代主题：使用纹理和彩色图标',
    data: {
      title: '数学课学习笔记 2025年6月20日',
      author: '唯知为之',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'streamline-kameleon-color:pencil-2', label: 'pencil-2' },
      customIcon: '',
      theme: {
        label: '现代',
        value: 'modern',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        }
      },
      font: { label: '霞鹜漫黑', value: 'font-xwmh', type: 'qt', typeName: '其他', url: 'https://fontsapi.zeoseven.com/134/main/result.css' },
      bg: { color: '#33bea6', type: 'color' as const },
      pattern: { label: '叉号集', value: 'hideout', type: 'basic', typeName: '基础', isOpacity: true },
      size: { label: '等比 1:1（小红书）', value: 'square vertical1-1 horizontal1-1' }
    }
  },

  {
    id: '7',
    name: '前端常用图标资源汇总 note.weizwz.com',
    preview: 'https://p.weizwz.com/cover/thiscover_example_7_fdbfc2f7903cbd18.webp',
    ratio: '3/2',
    mark: '经典主题：使用渐变背景和彩色图标',
    data: {
      title: '前端常用图标资源汇总\nnote.weizwz.com',
      author: '唯知笔记',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'logos:slack-icon', label: 'slack-icon' },
      customIcon: '',
      theme: {
        label: '经典',
        value: 'basic',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        }
      },
      font: { label: '霞鹜漫黑', value: 'font-xwmh', type: 'qt', typeName: '其他', url: 'https://fontsapi.zeoseven.com/134/main/result.css' },
      bg: { color: '#a3b3ff', type: 'gradient' as const, gradient: 'radial-gradient(circle at 35% 50%, #f2ea18 0%, #f53a19 100%)' },
      pattern: { label: '叉号集', value: 'hideout', type: 'basic', typeName: '基础', isOpacity: true },
      size: { label: '横向 3:2（掘金）', value: 'horizontal3-2' }
    }
  },

  {
    id: '8',
    name: 'OPPO主题图标设计',
    preview: 'https://p.weizwz.com/cover/thiscover_example_8_db9eec43bc97cbd4.webp',
    ratio: '1',
    mark: '手机主题：使用在线图片和手机截图',
    data: {
      title: 'OPPO主题图标设计',
      author: '唯知笔记',
      download: 'png' as const,
      scale: 2,
      icon: { value: 'streamline-block:devices-phone', label: 'devices-phone' },
      customIcon: '',
      theme: {
        label: '手机',
        value: 'mobile',
        preview: {
          src: '',
          height: 240,
          width: 400,
          blurDataURL: '',
          blurWidth: 8,
          blurHeight: 5
        },
        swapX: false,
        stretchY: true
      },
      font: { label: '抖音美好体', value: 'font-dymht', type: 'yt', typeName: '圆体', url: 'https://fontsapi.zeoseven.com/84/main/result.css' },
      bg: {
        color: '#b36548',
        type: 'unsplash' as const,
        unsplashUrl:
          'https://images.unsplash.com/photo-1660066543518-57247c9fc76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTQ0NTh8MHwxfHNlYXJjaHw2Nnx8V2lkZ2V0cyUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzUzODM0NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      pattern: { label: '无', value: 'none', type: 'basic', typeName: '基础' },
      size: { label: '等比 1:1（小红书）', value: 'square vertical1-1 horizontal1-1' }
    }
  }
]
