import { CoverProvider } from './coverContext'
import EDitorSetting from './editorSetting'

export default function Editor() {
  return (
    <div className="pt-14 h-full">
      <div className="h-full w-full flex overflow-hidden">
        <CoverProvider>
          <div className='h-full md:w-1/4'>
            <EDitorSetting />
          </div>
        </CoverProvider>
      </div>
    </div>
  );
}