'use client';

import { Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IProps {
  imageId?: string;
  customClasses?: string;
  thumbnail?: boolean;
  width?: number;
  height?: number;
  size: 200 | 400 | 800;
}

export default function StreamImage(props: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (props.imageId) {
      let imageUrl = '';

      const fetchImageStream = async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/file/${props.imageId}/${props.size}/webp`;

          const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok || response.status === 204) {
            throw new Error('Failed to fetch the image stream');
          }
          const blob = await response.blob();
          imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        } finally {
          setIsLoading(false);
        }
      };

      fetchImageStream();

      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }
    setIsLoading(false);
  }, [props.imageId, props.thumbnail]);

  return (
    <>
      {isLoading ? (
        <Loader2 />
      ) : props.imageId ? (
        imageSrc ? (
          <Image
            className={`${props.customClasses ? props.customClasses : ''} h-full w-full`}
            src={imageSrc}
            alt=""
            width={props.width ? props.width : 300}
            height={props.height ? props.height : 300}
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded border">
            <ImageIcon />
            <p className="text-[0.5rem]">Not found</p>
          </div>
        )
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded border">
          <ImageIcon />
        </div>
      )}
    </>
  );
}
