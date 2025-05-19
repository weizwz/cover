'use client'

import EditorImage from "./editorImage"
import EditorToImg from "./editorToImg"

const EditorPreview = () => {
  return (
    <div className='h-full w-full bg-gray-50'>
      <h2 className='text-lg font-bold text-center py-4'>封面预览</h2>
      <div className='overflow-auto flex flex-col justify-center items-center pb-12'>
        <EditorToImg>
          <EditorImage />
        </EditorToImg>
      </div>
    </div>
  )
}

export default EditorPreview