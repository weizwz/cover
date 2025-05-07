'use client'

import React, { useContext, useState } from 'react'
import { CoverContext } from './coverContext'
import unsplash from '../config/unsplash'
import { LoaderCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'


const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { coverSetting } = useContext(CoverContext);
  const componentRef = React.createRef<HTMLDivElement>();

  async function saveImage(data: string): Promise<void> {
    const getCurrentDate = (): string => new Date().toISOString().split('T')[0];
    var a = document.createElement('a') as HTMLAnchorElement;
    a.href = data;
    a.download = `cover-${getCurrentDate()}.png`;
    document.body.appendChild(a);
    setLoading(false);
    a.click();
    document.body.removeChild(a);
  }

  const downloadImage = async (): Promise<void> => {
    setLoading(true);

    if (componentRef.current) {
      let data = await getData(componentRef.current);
      await saveImage(data);

      if (coverSetting.unsplashImage) {
        unsplash.photos.trackDownload({ downloadLocation: coverSetting.unsplashImage.downloadLink });
      }
    }
  };

  async function getData(element: HTMLElement): Promise<string> {
    const options: GetDataOptions = {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
      allowTaint: true,
      height: element.offsetHeight,
      width: element.offsetWidth,
    };

    return await html2canvas(element, options).then((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL('image/png');
    });
  }

  return (
    <React.Fragment>
      <div ref={componentRef} className="w-full flex justify-center">
        {props.children}
      </div>
      <Button onClick={() => downloadImage()}>
        <span>
          {loading ? <LoaderCircle /> : <Download />}
        </span>
        <span className="mx-2">下载</span>
      </Button>
    </React.Fragment>
  );
};

export default EditorToImg
