'use client'

import EditorImage from './editorImage'
import EditorToImg from './editorToImg'

const EditorPreview = () => {
  return (
    <div className='h-full w-full bg-gray-50'>
      <h2 className='text-lg font-bold text-center py-4'>封面预览</h2>
      <EditorToImg>
        <EditorImage />
      </EditorToImg>
    </div>
  )
}

export default EditorPreview
