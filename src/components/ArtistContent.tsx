'use client';
import React from 'react';
import { IArtistExt } from '@/models/artist.model';
import { ITrack } from '@/models/track';
import { Pause, Play } from 'lucide-react';
import { useContext } from 'react';
import StreamImage from './streamImage';
import { nextTracksContext, playerContext, trackContext } from '@/app/providers';
import TracksList from '@/components/tracksList';

interface ArtistContentProps {
  artist: IArtistExt;
}

const ArtistContent = ({ artist }: ArtistContentProps) => {
  const audio = useContext(trackContext);
  const nextTracks = useContext(nextTracksContext);
  const player = useContext(playerContext);

  const handleTrackClick = (track: ITrack) => {
    if (audio.track && track.id === audio.track.id) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  const handleMainClick = () => {
    if (audio.track && audio.track.artist === artist?.name) {
      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } else {
      audio.setTrack({ ...artist.tracks[0], artist: artist?.name });
      nextTracks.setNextTracks(artist?.tracks || []);
      player.play();
    }
  };

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-gradient-to-b from-neutral-100 to-neutral-200 pb-24 dark:from-neutral-900 dark:to-black sm:pb-32">
      <div className="relative min-h-[350px] w-full sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
        <div className="h-full">
          <StreamImage size={800} imageId={artist.picture} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-900/90" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-4 text-center sm:p-6 md:flex-row md:items-end md:p-8 md:text-left lg:p-10">
          <div className="mb-4 h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl sm:h-52 sm:w-52 md:mb-0 md:mr-6 lg:h-64 lg:w-64">
            <StreamImage size={400} imageId={artist.picture} />
          </div>

          <div className="mb-2 space-y-2 md:mb-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {artist.name}
            </h1>
            <p className="mt-2 text-sm text-neutral-300 sm:mt-3 md:mt-4 md:text-base lg:text-lg">
              Released:{' '}
              {artist.tracks?.length ? new Date(artist.tracks[0].releaseDate).getFullYear() : 'N/A'}{' '}
              • {artist.tracks?.length || 0} tracks
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-6">
        <div className="mb-6 flex items-center gap-x-4 sm:mb-8">
          <button
            onClick={() => {
              if (artist.tracks?.length) {
                handleMainClick();
              }
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-green-500 transition hover:scale-105 hover:bg-green-400 sm:h-14 sm:w-14"
          >
            {player.isPlaying && audio.track?.artist === artist.name ? (
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
            {artist.tracks?.length ? (
              <TracksList
                tracks={artist.tracks.map((t) => {
                  return { ...t, artist: artist.name };
                })}
                onClick={handleTrackClick}
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

export default ArtistContent;
