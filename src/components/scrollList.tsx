'use client';

import { useRouter } from 'next/navigation';
import PlayButton from './PlayButton';
import StreamImage from './streamImage';

interface IProps {
  name: string;
  imageId?: string;
  href?: string;
  id?: number;
}

export default function ScrollList(props: IProps) {
  const router = useRouter();

  const navigate = () => {
    if (props.href) {
      router.push(props.href + props.id);
    }
  };

  return (
    <div
      onClick={navigate}
      className="group relative flex w-full cursor-pointer flex-col items-center justify-center gap-x-4 rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-md">
        <StreamImage size={200} imageId={props.imageId} />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{props.name}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <PlayButton />
      </div>
    </div>
  );
}
