import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import cover1 from '@/app/assets/images/ThisCover_20250523_171549.png'
import cover2 from '@/app/assets/images/ThisCover_20250523_173053.png'
import cover3 from '@/app/assets/images/ThisCover_20250523_180347.png'

export default function Main() {
  return (
    <div className='pt-14 h-full w-full flex flex-col items-center'>
      <div className='flex flex-col items-center w-360 gap-12'>
        <section className='py-16 w-full flex flex-col items-center gap-6'>
          <div className='font-bold text-center'>
            <h1 className='text-5xl md:text-6xl'>ThisCover</h1>
            <h2 className='text-3xl md:text-4xl mt-4'>
              一个 <span className='underline decoration-wavy decoration-red-400 underline-offset-6'>免费、漂亮</span> 的{' '}
              <span className='text-primary'>封面生成器</span>
            </h2>
          </div>
          <Link href='/editor' className='flex p-4 justify-center'>
            <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full'>现在开始</Button>
          </Link>
          <div className='w-full flex flex-wrap items-center justify-around p-12'>
            <div className='w-1/4 transform -translate-y-20 duration-300 border hover:scale-105 hover:-rotate-3 rotate-6 bg-white p-2 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
              <Image className='border border-gray-100 rounded mb-2' src={cover1} width={800} height={450} layout='responsive' alt='ThisCover-1' />
              <p className="animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
              <p className="animate animate-pulse w-8/12 bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
            </div>
            <div className='w-1/3 transform hover:scale-110 duration-300 border bg-white p-4 shadow-lg shadow-gray-50 rounded-lg flex flex-col'>
              <Image className='border border-gray-100 rounded mb-2' src={cover2} width={800} height={450} layout='responsive' alt='ThisCover-2' />
              <p className="animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
              <p className="animate animate-pulse w-8/12 bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
            </div>
            <div className='w-1/4 transform -translate-y-20 duration-300 hover:scale-105 hover:rotate-3 border -rotate-6 bg-white p-2 sshadow-lg shadow-gray-50 rounded-lg flex flex-col '>
              <Image className='border border-gray-100 rounded mb-2' src={cover3} width={800} height={450} layout='responsive' alt='ThisCover-2' />
              <p className="animate animate-pulse bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
              <p className="animate animate-pulse w-8/12 bg-gray-100 md:h-5 h-2 rounded mb-2"></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
