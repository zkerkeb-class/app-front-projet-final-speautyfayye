'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';

const Page = () => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const mockAlbum = {
    title: 'Random Access Memories',
    releaseDate: '2023-05-12',
    picture: 'https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_1280.jpg',
    tracks: [
      { id: 1, title: 'Get Lucky', duration: 248.2 },
      { id: 2, title: 'Instant Crush', duration: 337.8 },
      { id: 3, title: 'Lose Yourself to Dance', duration: 294.5 },
      { id: 4, title: 'Touch', duration: 498.7 },
      { id: 5, title: 'Within', duration: 228.4 },
      { id: 6, title: 'Beyond', duration: 290.1 },
      { id: 7, title: 'Motherboard', duration: 341.2 },
      { id: 8, title: 'Fragments of Time', duration: 279.3 },
    ],
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTrackClick = (trackId: number) => {
    if (selectedTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedTrack(trackId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-gradient-to-b from-neutral-100 to-neutral-200 pb-24 dark:from-neutral-900 dark:to-black sm:pb-32">
      {/* Hero Section reste inchangé */}
      <div className="relative min-h-[350px] w-full sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
        <Image
          src={mockAlbum.picture}
          alt={mockAlbum.title}
          fill
          className="object-cover opacity-40 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-900/90" />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-4 text-center sm:p-6 md:flex-row md:items-end md:p-8 md:text-left lg:p-10">
          <div className="mb-4 h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl sm:h-52 sm:w-52 md:mb-0 md:mr-6 lg:h-64 lg:w-64">
            <Image
              src={mockAlbum.picture}
              alt={mockAlbum.title}
              width={256}
              height={256}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-2 md:mb-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {mockAlbum.title}
            </h1>
            <p className="mt-2 text-sm text-neutral-300 sm:mt-3 md:mt-4 md:text-base lg:text-lg">
              Released: {new Date(mockAlbum.releaseDate).getFullYear()} • {mockAlbum.tracks.length}{' '}
              tracks • 45 min
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-10 lg:py-6">
        <div className="mb-6 flex items-center gap-x-4 sm:mb-8">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!selectedTrack) setSelectedTrack(mockAlbum.tracks[0].id);
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-green-500 transition hover:scale-105 hover:bg-green-400 sm:h-14 sm:w-14"
          >
            {isPlaying ? (
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
            {mockAlbum.tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track.id)}
                className={`group relative flex cursor-pointer items-center rounded-md px-3 py-2.5 transition hover:bg-white/10 sm:px-4 sm:py-3 ${
                  selectedTrack === track.id ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-x-3 sm:gap-x-6">
                    {/* Play button that appears on hover or when selected */}
                    <div className="relative w-5 sm:w-6">
                      <span
                        className={`absolute text-sm text-neutral-400 group-hover:opacity-0 sm:text-base ${
                          selectedTrack === track.id ? 'opacity-0' : ''
                        }`}
                      >
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <div
                        className={`absolute text-green-500 opacity-0 group-hover:opacity-100 ${
                          selectedTrack === track.id ? 'opacity-100' : ''
                        }`}
                      >
                        {selectedTrack === track.id && isPlaying ? (
                          <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p
                        className={`truncate text-sm sm:text-base ${
                          selectedTrack === track.id
                            ? 'text-green-500'
                            : 'text-neutral-900 group-hover:text-green-400 dark:text-white'
                        }`}
                      >
                        {track.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 group-hover:text-white sm:text-sm">
                    {formatDuration(track.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
