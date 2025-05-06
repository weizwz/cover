'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useContext, useState } from 'react'
import { CoverContext } from './coverContext'
import IconSelect from './iconSelect'
// import { DEFAULT_SETTING } from '../settings/default'

const EditorSetting = () => {
  const { coverSetting } = useContext(CoverContext)
  const [setting, setSetting] = useState(coverSetting)

  return (
    <div className='h-full w-full overflow-y-auto p-4'>
      <h2 className='text-lg font-bold text-center mb-4'>配置</h2>
      <form>
        <div className='grid w-full items-center gap-4'>
          <div className='flex space-x-1.5'>
            <Label htmlFor='title'>标 题</Label>
            <Textarea
              id='title'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入封面标题'
              defaultValue={setting.title}
              onChange={(e) => setSetting({ ...setting, title: e.target.value })}
            />
          </div>
          <div className='flex space-x-1.5'>
            <Label htmlFor='author'>作 者</Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              defaultValue={setting.author}
              onChange={(e) => setSetting({ ...setting, author: e.target.value })}
            />
          </div>
          <div className='flex space-x-1.5'>
            <Label htmlFor='author'>图 标</Label>
            <IconSelect onChange={(selectedOption) => setSetting({ ...setting, icon: selectedOption as IconOption })}/>
          </div>
          <div className='flex space-x-1.5'>
            <Label htmlFor='framework'>作者</Label>
            <Select>
              <SelectTrigger id='framework'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='next'>Next.js</SelectItem>
                <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                <SelectItem value='astro'>Astro</SelectItem>
                <SelectItem value='nuxt'>Nuxt.js</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditorSetting
