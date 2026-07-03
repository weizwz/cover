# ThisCover 项目开发指导规范 (Project Rules)

## 1. 技术栈 (Tech Stack)
- **核心框架**: Next.js 16.1.1 (App Router)
- **视图层**: React 19
- **样式引擎**: Tailwind CSS v4
- **UI 组件库**: shadcn/ui (基于 Radix UI)
- **图标库**: Lucide React、Iconify (API接入)
- **图片与导出**: Unsplash API、html2canvas-pro

## 2. 目录与组件规范 (Structure)
- **业务组件**: 统一存放在 `src/app/components/`，按功能模块拆分（如 `editor.tsx`, `backgroundSelect.tsx`），文件命名以小驼峰 (camelCase) 为主。
- **基础 UI 组件**: 存放在 `src/components/ui/`，由 shadcn/ui 统一管理，请勿随意修改其内部基础结构。
- **全局状态**: 使用 React Context (`src/app/components/coverContext.tsx`) 进行编辑器数据状态管理。
- **客户端渲染**: 涉及复杂交互、Context 调用、或 DOM 操作（如 html2canvas）的组件，需在文件顶部显式声明 `'use client'`。

## 3. 设计风格与色彩 (Design Aesthetics)
- **色彩系统**: 
  - 使用 `oklch` 色彩空间定义。
  - 核心主色调 (`primary`) 为蓝紫色 `oklch(45.7% 0.24 277.023)`。
  - 完全适配亮色 (Light) 与暗色 (Dark) 模式。
- **排版与字体**:
  - 全局配置了丰富的自定义中文字体（23+免费字体），如 `ToneOZ-Pinyin-WenKai-Medium`、`Smiley Sans Oblique` 等，通过 `font-*[name]` 的 Tailwind 类名调用。
- **视觉特征**:
  - 现代化、干净明快的界面风格。
  - 频繁使用卡片 (`Card`)、圆角 (`rounded-full`, `rounded-lg`)、描边 (`border`)。
  - 背景运用点阵/网格纹理（`graph-paper-primary`）及轻量色彩点缀（如 `bg-indigo-50/50`）。
  - 交互反馈丰富，运用大量过渡动画（hover:scale, hover:rotate, 骨架屏 pulse 等）。

## 4. 编码准则 (Coding Guidelines)
- **样式优先 Tailwind**: 所有 UI 表现均需通过 Tailwind CSS 工具类实现，除非极特殊的全局动画或字体定义（在 `globals.css` 中配置）。
- **功能第一性**: 以工具属性为主导，确保“实时预览”与“所见即所得”的性能与稳定性。
