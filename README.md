# ThisCover

一个免费、漂亮的封面生成器，基于 [**rutikwankhade/CoverView**](https://github.com/rutikwankhade/CoverView)

全新架构升级，使用 `next.js v15` + `react v19` + `shadcn/ui` + `tailwindcss v4` + `lucide icons`

在原来的基础上进行了汉化 + 本土功能定制和扩展

## 注意事项

### 环境变量

环境变量需要在根目录自行创建 `.env` 文件，内容如下：

```txt
NEXT_PUBLIC_API_ACCESS_KEY = 'xxxxx'
NEXT_PUBLIC_API_ICONIFY_URL = 'https://api.iconify.design'
```

NEXT_PUBLIC_API_ACCESS_KEY 即 unsplash api，需要到官网申请 https://unsplash.com/developers

## 功能修改

- [x] 文字汉化
- [x] ~~使用iconify的simple-icons系列图标，当前3000+~~
- [x] 应用开源/免费商用字体，当前29+
- [x] 纹理修改，支持除自定义背景图片外的其他主题，当前18+
- [x] 修改平台为尺寸，提供常用比例，如1:1、16:9等，当前9+
- [x] 桌面和手机预览主题替换背景图为真机
- [x] 添加保存按钮，存储常用配置信息到本地浏览器
- [x] 添加输出图片放大倍数选项，支持0.5-5倍
- [x] 添加保存图片格式选项，支持png、jpg、webp
- [x] 添加复制图片到剪切板功能
- [x] 左文右图主题，支持图片和文本位置互换
- [x] 手机预览主题，支持图片拉伸充满框架
- [x] 图标整合：支持上传自定义图标，iconify图标搜索支持显示最多100
- [x] 添加清除按钮，清除本地浏览器配置
- [x] 添加首页、主要内容：功能、常见问题、封面示例等
- [x] 背景选项扩展，支持单色，渐变和上传图片、在线图片
- [x] 首页示例支持一键使用
- [x] 纹理现在支持纯色背景和渐变背景
- [ ] 背景图片支持模糊和灰度
- [ ] 加入随机功能，支持随机底纹和背景色/渐变色
- [ ] 添加新主题，类似九宫格/拼图等，待设计

## BUG

- [x] 部分纹理生成图片后错乱，如爱心、五角星等
- [x] 图标上传后再次搜索使用在线图标，再次上传相同的本地图标后没有变化
