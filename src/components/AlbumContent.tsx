'use client';

// components/album-content.tsx
import { nextTracksContext, playerContext, trackContext } from '@/app/providers';
import TracksList from '@/components/tracksList';
import { IAlbumExt } from '@/models/album.model';
import { ITrackExt } from '@/models/track.model';
import { Pause, Play } from 'lucide-react';
import { useContext } from 'react';
import StreamImage from './streamImage';

interface AlbumContentProps {
  album: IAlbumExt;
}

const AlbumContent = ({ album }: AlbumContentProps) => {
  const audio = useContext(trackContext);
  const nextTracks = useContext(nextTracksContext);
  const player = useContext(playerContext);

  const handleTrackClick = (track: ITrackExt) => {
    if (audio.track && track.id === audio.track.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      audio.setTrack({ ...track, artist: album?.artist });
      nextTracks.setNextTracks(album?.tracks || []);
      player.play();
    }
  };

  const handleMainClick = () => {
    if (audio.track && audio.track.album_id === album?.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      if (album?.tracks?.length) {
        audio.setTrack({ ...album.tracks[0], artist: album.artist });
        nextTracks.setNextTracks(album.tracks);
        player.play();
      }
    }
  };

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-gradient-to-b from-neutral-100 to-neutral-200 pb-24 dark:from-neutral-900 dark:to-black sm:pb-32">
      <div className="relative min-h-[350px] w-full sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
        <div className="h-full max-h-[500px] overflow-hidden">
          <StreamImage size={400} imageId={album.picture} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-900/90" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-4 text-center sm:p-6 md:flex-row md:items-end md:p-8 md:text-left lg:p-10">
          <div className="mb-4 h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl sm:h-52 sm:w-52 md:mb-0 md:mr-6 lg:h-64 lg:w-64">
            <StreamImage size={800} imageId={album.picture} height={500} />
          </div>

          <div className="mb-2 space-y-2 md:mb-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {album.artist?.name}
            </h1>
            <h2 className="text-xl font-bold text-neutral-300 sm:text-3xl md:text-4xl lg:text-5xl">
              {album.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-300 sm:mt-3 md:mt-4 md:text-base lg:text-lg">
              Released: {new Date(album.releaseDate).getFullYear()} • {album.tracks?.length || 0}{' '}
              tracks
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-6">
        <div className="mb-6 flex items-center gap-x-4 sm:mb-8">
          <button
            onClick={() => {
              if (album.tracks?.length) {
                handleMainClick();
              }
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-green-500 transition hover:scale-105 hover:bg-green-400 sm:h-14 sm:w-14"
          >
            {player.isPlaying && audio.track?.album_id === album.id ? (
              <Pause className="h-6 w-6 fill-black text-black transition group-hover:scale-110 sm:h-8 sm:w-8" />
            ) : (
              <Play className="h-6 w-6 fill-black text-black transition group-hover:scale-110 sm:h-8 sm:w-8" />
            )}
          </button>
        </div>

        <div className="mt-4 sm:mt-6">
          <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white sm:mb-6 sm:text-2xl">
            Tracks
          </h2>
          <div className="flex flex-col gap-y-1">
            {album.tracks?.length ? (
              <TracksList
                tracks={album.tracks.map((t) => {
                  return { ...t, artist: album.artist };
                })}
                onClick={handleTrackClick}
                entityId={album.id}
              />
            ) : (
              'No tracks found.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumContent;
