import { CoverProvider } from './coverContext'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme';
import { Separator } from "@/components/ui/separator"

export default function Editor() {
  return (
    <div className="pt-14 h-full">
      <div className="h-full w-full flex overflow-hidden">
        <CoverProvider>
          <div className='h-full lg:w-1/4'>
            <EditorSetting />
          </div>
          <Separator orientation="vertical" />
          <div className='h-full lg:flex-1'></div>
          <Separator orientation="vertical" />
          <div className='h-full w-[300px]'>
            <EditorTheme />
          </div>
        </CoverProvider>
      </div>
    </div>
  );
}