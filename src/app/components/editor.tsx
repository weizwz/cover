import { CoverProvider } from './coverContext'
import EDitorSetting from './editorSetting'
import { Separator } from "@/components/ui/separator"

export default function Editor() {
  return (
    <div className="pt-14 h-full">
      <div className="h-full w-full flex overflow-hidden">
        <CoverProvider>
          <div className='h-full lg:w-1/4'>
            <EDitorSetting />
          </div>
          <Separator orientation="vertical" />
        </CoverProvider>
      </div>
    </div>
  );
}