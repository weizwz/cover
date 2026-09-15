import React from 'react'

const ThemePreview = ({ theme }: { theme: string }) => {
  const renderContent = () => {
    switch (theme) {
      case 'outline':
        return (
          <div className="flex h-full w-full flex-col justify-center gap-1.5 bg-gray-300 p-3">
            <div className="h-3 w-3 rounded-full bg-white" />
            <div className="h-2 w-full rounded-full bg-white" />
            <div className="h-1 w-6 rounded-full bg-white" />
          </div>
        )
      case 'modern':
        return (
          <div className="flex h-full w-full items-center gap-2 bg-gray-300 p-3">
            <div className="h-4 w-4 shrink-0 rounded-full border-3 border-white bg-transparent" />
            <div className="flex flex-1 flex-col gap-1.5 rounded-sm bg-white p-2">
              <div className="h-2 w-full rounded-full bg-gray-300" />
              <div className="h-1 w-1/2 rounded-full bg-gray-300" />
            </div>
          </div>
        )
      case 'basic':
        return (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-300 p-3">
            <div className="flex w-full flex-col gap-1.5 rounded-sm bg-white p-2">
              <div className="h-2 w-full rounded-full bg-gray-300" />
              <div className="flex w-full items-center justify-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div className="h-1 w-4 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        )
      case 'background':
        return (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gray-300">
            <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-white opacity-50" />
            <div className="absolute top-2 -left-4 h-10 w-10 rounded-full bg-white opacity-50" />
            <div className="z-10 flex flex-col items-center gap-1.5">
              <div className="h-4 w-4 rounded-full bg-white" />
              <div className="h-2 w-16 rounded-full bg-white" />
              <div className="h-1 w-6 rounded-full bg-white" />
            </div>
          </div>
        )
      case 'stylish':
        return (
          <div className="flex h-full w-full items-center justify-between bg-gray-300">
            <div className="flex h-full w-1/2 flex-1 flex-col justify-center gap-2 bg-white/80 p-2">
              <div className="h-2 w-full rounded-full bg-gray-300" />
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div className="h-1 w-4 rounded-full bg-gray-300" />
              </div>
            </div>
            <div className="relative h-full w-1/2">
              <div className="absolute -right-2 -bottom-2 h-10 w-10 rounded-full bg-white opacity-50" />
              <div className="absolute -top-2 left-0 h-6 w-6 rounded-full bg-white opacity-50" />
            </div>
          </div>
        )
      case 'preview':
        return (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gray-300 px-3">
            <div className="h-1 w-6 rounded-full bg-white"></div>
            <div className="h-2 w-full rounded-full bg-white"></div>
            <div className="flex h-6 w-3/5 flex-col overflow-hidden rounded-t-[3px] bg-white shadow-sm">
              <div className="flex h-3 w-full items-center gap-1 rounded-t-[3px] border-b border-gray-100 px-1">
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="h-1 w-1 rounded-full bg-gray-300"></div>
              </div>
              <div className="h-full w-full bg-gray-200"></div>
            </div>
            <div className="-mt-1 h-1 w-14 rounded-full bg-gray-100 shadow-sm"></div>
          </div>
        )
      case 'mobile':
        return (
          <div className="flex h-full w-full items-center justify-center gap-2 bg-gray-300 p-3">
            <div className="flex w-2/3 flex-1 flex-col items-center gap-1.5">
              <div className="h-1 w-4 rounded-full bg-white" />
              <div className="h-2 w-full rounded-full bg-white" />
            </div>
            <div className="flex h-full w-1/3 flex-col items-center rounded-sm border-2 border-white bg-transparent py-1">
              <div className="h-0.5 w-3 rounded-full bg-white" />
              <div className="mt-2 h-8 w-full bg-white opacity-20" />
              <div className="mt-auto h-1 w-4 rounded-full bg-white" />
            </div>
          </div>
        )
      default:
        return <div className="h-full w-full bg-gray-200" />
    }
  }

  return <div className="h-16 w-24 overflow-hidden rounded-md bg-gray-50">{renderContent()}</div>
}

export default ThemePreview
