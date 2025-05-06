import { CoverProvider } from './coverContext'

export default function Editor() {
  return (
    <div className="pt-14 h-full">
      <div className="h-full w-full flex overflow-hidden">
        <CoverProvider>
          111
        </CoverProvider>
      </div>
    </div>
  );
}