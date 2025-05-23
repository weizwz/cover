import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Main() {
  return (
    <div className='pt-14 h-full w-full flex flex-col items-center gap-10'>
      <section className='py-16 flex flex-col items-center gap-6'>
        <div className='font-bold text-center'>
          <h1 className='text-5xl md:text-6xl'>ThisCover</h1>
          <h2 className='text-3xl md:text-4xl mt-4'>
            一个 <span className='underline decoration-wavy decoration-red-400 underline-offset-6'>免费、漂亮</span> 的 <span className='text-primary'>封面生成器</span>
          </h2>
        </div>
        <Link href='/editor' className='flex p-4 justify-center'>
          <Button className='cursor-pointer md:py-6 md:px-16 md:text-lg font-bold rounded-full'>现在开始</Button>
        </Link>
      </section>
    </div>
  )
}
