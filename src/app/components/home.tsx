import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CircleArrowRight } from 'lucide-react'

import cover1 from '@/app/assets/images/ThisCover_20250523_171549.webp'
import cover2 from '@/app/assets/images/ThisCover_20250523_173053.webp'
import cover3 from '@/app/assets/images/ThisCover_20250523_180347.webp'

import cover4 from '@/app/assets/images/ThisCover_20250524_001002.webp'
import cover5 from '@/app/assets/images/ThisCover_20250524_005755.webp'
import cover6 from '@/app/assets/images/ThisCover_20250524_011123.webp'
import cover7 from '@/app/assets/images/ThisCover_20250524_012817.webp'
import cover8 from '@/app/assets/images/ThisCover_20250524_013456.webp'

export default function Main() {
  return (
    <div className='pt-14 w-full flex flex-col items-center'>
      <section className='w-full px-4 md:px-12 pt-16 flex flex-col items-center gap-6 graph-paper-primary'>
        <div className='font-bold text-center'>
          <h1 className='text-5xl md:text-6xl font-extrabold'>ThisCover</h1>
          <h2 className='text-3xl md:text-4xl font-bold mt-4'>
            一个 <span className='underline decoration-wavy decoration-red-400 underline-offset-6'>免费、漂亮</span> 的{' '}
            <span className='text-primary'>封面生成器</span>
          </h2>
        </div>
        <Link href='/editor' className='flex justify-center mt-4'>
          <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full'>现在开始</Button>
        </Link>
        <div className='w-full max-w-360 flex flex-wrap justify-around px-4'>
          <div className='w-full md:w-1/4 h-fit transform duration-300 border hover:scale-110 hover:-rotate-3 rotate-6 bg-white p-2 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
            <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover1} width={800} height={450} alt='ThisCover-1' />
            <p className='animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/3 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
          </div>
          <div className='w-full md:w-1/3 h-fit transform md:translate-y-4 hover:scale-110 duration-300 border bg-white p-4 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
            <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover2} width={800} height={450} alt='ThisCover-2' />
            <p className='animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/4 bg-gray-100 md:h-5 h-2 rounded mb-2 m-auto'></p>
          </div>
          <div className='w-full md:w-1/4 h-fit transform md:-translate-y-8 duration-300 hover:scale-110 hover:rotate-3 border -rotate-6 bg-white p-2 shadow-lg shadow-gray-50 rounded-lg flex flex-col '>
            <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover3} width={600} height={600} alt='ThisCover-2' />
            <p className='animate animate-pulse w-1/2 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/2 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
          </div>
        </div>
      </section>

      <section className='w-full px-4 md:px-12 py-12 flex flex-col items-center bg-indigo-50/50 graph-paper-primary gap-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-primary'>基本功能</h2>
        <div className='flex justify-center items-center flex-wrap gap-4'>
          <Badge className='px-3 py-1 rounded-full bg-purple-500/10 border-purple-500/20 text-purple-500' variant='secondary'>
            个性主题
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-orange-500/10 border-orange-500/20 text-orange-500' variant='secondary'>
            20w+图标
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-green-500/10 border-green-500/20 text-green-500' variant='secondary'>
            23+免费字体
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-sky-500/10 border-sky-500/20 text-sky-500' variant='secondary'>
            实时预览
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-red-500/10 border-red-500/20 text-red-500' variant='secondary'>
            响应式设计
          </Badge>
          <Badge className='px-3 py-1 rounded-full bg-blue-500/10 border-blue-500/20 text-blue-500' variant='secondary'>
            支持各大主流平台
          </Badge>
        </div>
        <div className='w-full max-w-360 flex justify-center flex-wrap'>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>个性创作</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  图标、背景、字体、底纹多样化配置
                  <br/>简洁、现代、经典、背景、手机预览等多个主题<br/>
                  两者配合创造<span className='text-primary font-bold'>独属于你的作品</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>实时预览</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  预览界面实时展现，配置即改即变<br/>
                  主题切换，实时生效<br/>
                  预览图即导出图，<span className='text-primary font-bold'>所见即所得</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>主流适配</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  9+主流尺寸，横板+竖版，小红书，头条、知乎等<span className='text-primary font-bold'>多平台适配</span>
                  <br/>
                  png、jpg、webp都多格式输出，还可一键复制
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/2 xl:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>开源免费</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  开源免费，静态部署，无后台交互<br/>保护你的每一份设计<br/>
                  <span className='text-primary font-bold'>MIT协议</span>，想怎么用就怎么用
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className='w-full px-4 md:px-12 py-12 flex flex-col items-center gap-4'>
        <h2 className='text-2xl md:text-3xl font-bold'>常见问题</h2>
        <div className='w-full max-w-360 flex justify-center flex-wrap px-4'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-md'>选择字体后，字体并没有变化</AccordionTrigger>
              <AccordionContent>
                字体选择后需要在线加载，请耐心等待。<br/>如果等待时间过长，请查看你的网络状态是否良好；也有可能是网络波动，请稍后再试
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='text-md'>找不到想要的图标，不知道怎么搜索</AccordionTrigger>
              <AccordionContent>
                1. 搜索时请使用英文 <br/>2.当前使用的是{' '}
                <a className='text-primary underline' href='https://icon-sets.iconify.design/' target='_blank'>
                  iconify图标
                </a>
                ，可以在此平台上找到想要的图标后，再来根据对应的名称进行搜索
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger className='text-md'>使用图片搜索功能时加载很慢，甚至加载不出来</AccordionTrigger>
              <AccordionContent>
                图片搜索使用的是国外 unsplash 的API，国内加载较慢，请耐心等待。建议使用科学上网工具，这样加载会很快。<br/>
                搜索词请使用英文，国内开源免费的API较少，请见谅
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-4'>
              <AccordionTrigger className='text-md'>预览主题中上传的截图总是覆盖不全？</AccordionTrigger>
              <AccordionContent>桌面和手机截图尽量按照提示比例来，效果会更好；高度可以超出一部分会被截取掉，不影响整体观感</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-5'>
              <AccordionTrigger className='text-md'>无法下载、无法复制？</AccordionTrigger>
              <AccordionContent>图片下载、复制功能基本支持主流浏览器，请查看浏览器版本是否过低 或者 最好使用最新版chrome浏览器</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className='w-full px-4 md:px-12 py-12 flex flex-col items-center bg-indigo-50/50 graph-paper-primary gap-8'>
        <h2 className='text-2xl md:text-3xl font-bold text-primary'>更多示例</h2>
        <div className='w-full max-w-360 px-4 pt-4'>
          <h3 className='text-md font-bold mb-2'>友情提示：</h3>
          <p className='text-sm mb-2'>1. 作者是可以留空的，删除内容后在封面中不会占用任何空间；作者也可以当副标题使用</p>
          <p className='text-sm mb-2'>2. 设置背景时，点开颜色面板，左侧有一个喷枪的图标，点击后可以取当前屏幕中的所有颜色，包括桌面</p>
          <p className='text-sm mb-2'>3. 博客封面黄金比例一般是16:9，足以适配大多数博客平台</p>
          <p className='text-sm mb-2'>
            4. 设置好常用的配置后，可以点击保存按钮，保存到本地浏览器，下次进来会读取这个配置。如果不想要了，可以点击 清除已保存配置
          </p>
        </div>
        <div className='w-full max-w-360 flex flex-wrap justify-around'>
          <div className='w-full md:w-1/3 p-4'>
            <div className='w-full h-fit border bg-white p-2 mb-8 shadow-lg shadow-gray-50 rounded-lg flex flex-col overflow-hidden'>
              <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover8} width={600} height={1066} alt='ThisCover-1' />
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                背景色：取色器取截图中的颜色 <Separator orientation='vertical' /> 纹理：无
              </div>
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                尺寸：9:16 <Separator orientation='vertical' /> 主题：手机预览
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/3 p-4'>
            <div className='w-full h-fit border bg-white p-2 mb-8 shadow-lg shadow-gray-50 rounded-lg flex flex-col overflow-hidden'>
              <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover4} width={600} height={600} alt='ThisCover-1' />
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                图标：xiaohongshu <Separator orientation='vertical' /> 背景色：rgb(255, 36, 66)
              </div>
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                纹理：爱心 <Separator orientation='vertical' /> 尺寸：1:1 <Separator orientation='vertical' /> 主题：简洁
              </div>
            </div>
            <div className='w-full h-fit border bg-white p-2 mb-8 shadow-lg shadow-gray-50 rounded-lg flex flex-col overflow-hidden'>
              <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover6} width={800} height={450} alt='ThisCover-1' />
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                作者：删除留空 <Separator orientation='vertical' /> 字体：思源宋体 <Separator orientation='vertical' /> 纹理：无
              </div>
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                尺寸：16:9 <Separator orientation='vertical' /> 主题：桌面预览
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/3 p-4'>
            <div className='w-full h-fit border bg-white p-2 mb-8 shadow-lg shadow-gray-50 rounded-lg flex flex-col overflow-hidden'>
              <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover5} width={800} height={450} alt='ThisCover-1' />
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                字体：抖音美好体 <Separator orientation='vertical' /> 背景搜索词：beautiful background
              </div>
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                尺寸：16:9 <Separator orientation='vertical' /> 主题：图文对称
              </div>
            </div>
            <div className='w-full h-fit border bg-white p-2 mb-8 shadow-lg shadow-gray-50 rounded-lg flex flex-col overflow-hidden'>
              <Image className='w-full h-auto border border-gray-100 rounded mb-2' src={cover7} width={800} height={600} alt='ThisCover-1' />
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                图标：juejin <Separator orientation='vertical' /> 背景色：rgb(35,128,254)
              </div>
              <div className='w-full bg-gray-100 rounded px-2 py-1 flex gap-2 md:gap-4 text-sm mb-2'>
                纹理：编织带 <Separator orientation='vertical' /> 尺寸：3:2 <Separator orientation='vertical' /> 主题：现代
              </div>
            </div>
          </div>
        </div>
        <Link href='/editor' className='flex justify-center pb-4'>
          <Button className='cursor-pointer md:py-6 md:px-16  has-[>svg]:px-16 md:text-lg font-bold rounded-full'>
            <CircleArrowRight size={24} className='size-6' /> 快来试试吧
          </Button>
        </Link>
      </section>

      <footer className='w-full px-4 md:px-12 py-12 flex flex-col items-center gap-4'>
        <p>
          Copyright © 2025{new Date().getFullYear() === 2025 ? '' : '-' + new Date().getFullYear()}
          <a className='font-bold text-primary ml-2' target='_blank' href='https://note.weizwz.com/'>
            weizwz
          </a>
        </p>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <a target='_blank' href='https://nextjs.org/' title='本站框架基于 Next.js 15.3.1'>
            <img alt='Next.js' src='https://img.shields.io/badge/Frame-Next.js-000?logo=nextdotjs&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://react.dev/' title='本站语言使用 React 19.0.0'>
            <img alt='React' src='https://img.shields.io/badge/Language-React-61DAFB?logo=react&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://lucide.dev/' title='本站图标库使用 Lucide'>
            <img alt='Lucide' src='https://img.shields.io/badge/Icon-Lucide-F56565?logo=lucide&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://tailwindcss.com/' title='本站样式库使用 Tailwind CSS 4'>
            <img alt='Tailwind CSS' src='https://img.shields.io/badge/CSS-Tailwind CSS-16BCFF?logo=tailwindcss&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://ui.shadcn.com/' title='本站UI框架使用 shadcn/ui'>
            <img alt='shadcn/ui' src='https://img.shields.io/badge/UI-shadcnui-000?logo=shadcnui&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://iconify.design/' title='本站图标API使用 iconify'>
            <img alt='iconify' src='https://img.shields.io/badge/Icon API-iconify-1769AA?logo=iconify&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://unsplash.com/developers' title='本站图片API使用 unsplash'>
            <img alt='unsplash' src='https://img.shields.io/badge/Image API-unsplash-000000?logo=unsplash&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://github.com/weizwz' title='本站代码托管于 Github'>
            <img alt='Github' src='https://img.shields.io/badge/Code-Github-432DD7?logo=github&amp;logoColor=fff' />
          </a>
          <a target='_blank' href='https://vercel.com/' title='本站部署于 Vercel'>
            <img alt='Vercel' src='https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&amp;logoColor=fff' />
          </a>
        </div>
      </footer>
    </div>
  )
}
