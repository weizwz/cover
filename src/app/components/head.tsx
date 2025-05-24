'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Head({ className }: { className?: string }) {

  return (
    <header className='h-14 fixed border-b top-0 z-40 w-full bg-white shadow-xs'>
      <div className={`h-full px-8 flex justify-between items-center ${className}`}>
        <Link className='h-full flex items-center cursor-pointer' href='/'>
          <Image src='/logo.png' alt='logo' width={28} height={28} priority />
          <div className='text-xl ml-2 font-bold font-mono text-primary'>ThisCover</div>
        </Link>
        <div className='flex-1 flex items-center justify-between'>
          <div className='flex-1 flex items-center'>
          </div>
          <div className='h-full flex items-center justify-end'>
            <Button className='rounded-3xl'>
              <a href='https://github.com/weizwz/cover' target='_blank'>
                ⭐ Star on Github
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
