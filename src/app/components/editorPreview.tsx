'use client'

import EditorImage from './editorImage'
import EditorToImg from './editorToImg'

const EditorPreview = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto bg-gray-50 px-6 py-4">
      <h2 className="text-primary text-center text-lg font-bold">封面预览</h2>
      <div className="flex w-full items-center pb-12 sm:justify-center">
        <EditorToImg>
          <EditorImage />
        </EditorToImg>
      </div>
    </div>
  )
}

export default EditorPreview
