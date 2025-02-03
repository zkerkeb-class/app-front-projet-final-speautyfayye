import StreamImage from './streamImage';

interface IProps {
  imageId: string;
}

export default function BackgroundImage(props: IProps) {
  return (
    <>
      <div className="h-full max-h-[500px] overflow-hidden">
        <StreamImage size={800} imageId={props.imageId} />
      </div>
      <div className="absolute inset-0 max-h-[500px] bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-900/90" />
    </>
  );
}
