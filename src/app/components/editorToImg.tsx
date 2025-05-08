'use client'

import React, { useContext, useState } from 'react'
import { CoverContext } from './coverContext'
import unsplash from '../config/unsplash'
import { LoaderCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas-pro'
import { getFormattedDateTime } from '../tools/date'


const EditorToImg: React.FC<EditorToImgProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { coverSetting } = useContext(CoverContext);
  const componentRef = React.createRef<HTMLDivElement>();

  async function saveImage(data: string): Promise<void> {
    var a = document.createElement('a') as HTMLAnchorElement;
    a.href = data;
    a.download = `cover-${getFormattedDateTime()}.png`;
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

      if (coverSetting.unsplashImage?.downloadLink) {
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
      <div className='relative'>
        <div ref={componentRef} className="w-full">
          {props.children}
        </div>
        <div className='absolute top-0 left-full px-4'>
          <Button disabled={loading} variant="outline" size="icon" onClick={() => downloadImage()}>
            {loading ? <LoaderCircle className="animate-spin" /> : <Download />}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditorToImg
