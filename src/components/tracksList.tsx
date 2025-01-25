import { playerContext, trackContext } from '@/app/providers';
import { formatDuration } from '@/constants/data';
import { IArtist } from '@/models/artist';
import { ITrackExt } from '@/models/track';
import { Pause, Play } from 'lucide-react';
import { useContext } from 'react';

interface IProps {
  tracks: ITrackExt[];
  onClick: (track: ITrackExt) => void;
}

export default function TracksList(props: IProps) {
  const audio = useContext(trackContext);
  const player = useContext(playerContext);

  return (
    <div className="flex flex-col gap-y-1">
      {props.tracks.map((track) => (
        <div
          key={track.id}
          onClick={() => props.onClick(track)}
          className={`group relative flex cursor-pointer items-center rounded-md px-3 py-2.5 transition hover:bg-white/10 sm:px-4 sm:py-3 ${
            audio.track?.id === track.id ? 'bg-white/10' : ''
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-x-3 sm:gap-x-6">
              <div className="relative w-5 sm:w-6">
                <span
                  className={`absolute -top-2 text-sm text-neutral-400 group-hover:opacity-0 sm:text-base ${
                    audio.track?.id === track.id ? 'opacity-0' : ''
                  }`}
                >
                  {track.trackNumber.toString().padStart(2, '0')}
                </span>
                <div
                  className={`absolute -top-2 text-green-500 opacity-0 group-hover:opacity-100 ${
                    audio.track?.id === track.id ? 'opacity-100' : ''
                  }`}
                >
                  {audio.track?.id === track.id && player.isPlaying ? (
                    <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
              </div>
              <div>
                <p
                  className={`truncate text-sm sm:text-base ${
                    audio.track?.id === track.id
                      ? 'text-green-500'
                      : 'text-neutral-900 group-hover:text-green-400 dark:text-white'
                  }`}
                >
                  {track.title}
                </p>
              </div>
              <div>
                <p
                  className={`truncate text-sm sm:text-base ${
                    audio.track?.id === track.id
                      ? 'text-green-500'
                      : 'text-neutral-900 group-hover:text-green-400 dark:text-white'
                  }`}
                >
                  {(track.artist as IArtist)?.name ?? 'Artiste inconnu'}
                </p>
              </div>
            </div>
            <div className="text-xs text-neutral-500 group-hover:text-white sm:text-sm">
              {formatDuration(Number(track.duration))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
