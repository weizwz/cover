import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import cover1 from '@/app/assets/images/ThisCover_20250523_171549.png'
import cover2 from '@/app/assets/images/ThisCover_20250523_173053.png'
import cover3 from '@/app/assets/images/ThisCover_20250523_180347.png'

export default function Main() {
  return (
    <div className='pt-14 w-full flex flex-col items-center'>
      <section className='w-full pt-16 px-16 flex flex-col items-center gap-6'>
        <div className='font-bold text-center'>
          <h1 className='text-5xl md:text-6xl font-extrabold'>ThisCover</h1>
          <h2 className='text-3xl md:text-4xl font-bold mt-4'>
            一个 <span className='underline decoration-wavy decoration-red-400 underline-offset-6'>免费、漂亮</span> 的{' '}
            <span className='text-primary'>封面生成器</span>
          </h2>
        </div>
        <Link href='/editor' className='flex justify-center mt-4'>
          <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full'>让我试试</Button>
        </Link>
        <div className='w-full max-w-360 flex flex-wrap justify-around'>
          <div className='w-full md:w-1/4 h-fit transform duration-300 border hover:scale-110 hover:-rotate-3 rotate-6 bg-white p-2 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
            <Image className='border border-gray-100 rounded mb-2' src={cover1} width={800} height={450} layout='responsive' alt='ThisCover-1' />
            <p className='animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/3 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
          </div>
          <div className='w-full md:w-1/3 h-fit transform md:translate-y-4 hover:scale-110 duration-300 border bg-white p-4 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
            <Image className='border border-gray-100 rounded mb-2' src={cover2} width={800} height={450} layout='responsive' alt='ThisCover-2' />
            <p className='animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/4 bg-gray-100 md:h-5 h-2 rounded mb-2 m-auto'></p>
          </div>
          <div className='w-full md:w-1/4 h-fit transform md:-translate-y-8 duration-300 hover:scale-110 hover:rotate-3 border -rotate-6 bg-white p-2 shadow-lg shadow-gray-50 rounded-lg flex flex-col '>
            <Image className='border border-gray-100 rounded mb-2' src={cover3} width={800} height={450} layout='responsive' alt='ThisCover-2' />
            <p className='animate animate-pulse w-1/2 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
            <p className='animate animate-pulse w-1/2 bg-gray-100 md:h-5 h-2 rounded mb-2'></p>
          </div>
        </div>
      </section>

      <section className='w-full p-y16 py-12 flex flex-col items-center bg-indigo-50/50 gap-4'>
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
          <div className='w-full md:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>个性化主题</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  图标、背景、字体、底纹<span className='text-primary font-bold'>多样化配置</span>
                  <br></br>简洁、现代、经典、背景、手机预览等多个个性化主题选择<br></br>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>实时预览</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  预览界面实时展现，配置即改即变<br></br>
                  主题切换即生效<br></br>
                  <span className='text-primary font-bold'>所见即所得</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>主流适配</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  9+主流尺寸，横板+竖版，小红书，头条、知乎等<span className='text-primary font-bold'>多平台适配</span>
                  <br></br>
                  png、jpg、webp都多格式输出，还可一键复制
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className='w-full md:w-1/4 p-4 box-border'>
            <Card className='w-full h-full'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-lg'>永久免费</CardTitle>
                <CardDescription className='text-md text-gray-800'>
                  开源项目，每一行代码都看得见，无后门、不采集隐私<br></br>
                  <span className='text-primary font-bold'>MIT协议</span>，想怎么用就怎么用
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className='w-full p-y16 py-12 flex flex-col items-center gap-4'>
        <h2 className='text-2xl md:text-3xl font-bold'>常见问题</h2>
        <div className='w-full max-w-360 flex justify-center flex-wrap'>
          <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='text-md'>选择字体后，字体并没有变化</AccordionTrigger>
              <AccordionContent>字体选择后需要在线加载，请耐心等待。<br></br>如果等待时间过长，请查看你的网络状态是否良好；也有可能是网络波动，请稍后再试</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='text-md'>找不到想要的图标，不知道怎么搜索</AccordionTrigger>
              <AccordionContent>1. 搜索时请使用英文 <br></br>2.当前使用的是 <a className='text-primary underline' href='https://icon-sets.iconify.design/' target='_blank'>iconify图标</a>，可以在此平台上找到想要的图标后，再来根据对应的名称进行搜索</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
            <AccordionTrigger className='text-md'>无法下载、无法复制？</AccordionTrigger>
              <AccordionContent>图片下载、复制功能基本支持主流浏览器，请查看浏览器版本是否过低 或者 最好使用最新版chrome浏览器</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
