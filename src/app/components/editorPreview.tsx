'use client'

import EditorImage from "./editorImage"
import EditorToImg from "./editorToImg"

const EditorPreview = () => {
  return (
    <div className='h-full w-full bg-gray-50'>
      <h2 className='text-lg font-bold text-center my-4'>封面预览</h2>
      <div className='w-fit sm:w-full flex flex-col justify-center items-center'>
        <EditorToImg>
          <EditorImage />
        </EditorToImg>
      </div>
    </div>
  )
}

export default EditorPreview