import Image from "next/image"
 
import { Button } from "@/components/ui/button"

export default function Head() {
  return (
    <header className="h-14 fixed border-b top-0 z-40 w-full bg-white shadow-xs">
      <div className="h-full px-8 flex justify-between items-center">
        <div className="h-full flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={28}
            height={28}
            priority
          />
          <div className="text-xl ml-2 font-bold font-mono text-indigo-700">cover
            <span className="hidden md:inline"> - 封面制作器</span>
          </div>
        </div>
        <div className="h-full flex flex-1 items-center justify-end">
          <Button className="bg-indigo-700 hover:bg-indigo-500 rounded-3xl">
            <a href="https://github.com/weizwz/cover" target="_blank">⭐ Star on Github</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
