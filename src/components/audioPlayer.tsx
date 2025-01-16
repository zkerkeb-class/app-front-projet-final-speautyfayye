'use client';

import React, { useRef, useState, useEffect, useContext } from 'react';
import { fetchAudio } from '../services/audio';
import { trackContext, playerContext, nextTracksContext } from '@/app/providers';
import { ITrack } from '@/models/track';
import Image from 'next/image';
import {
  ListMusic,
  Maximize2,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Loader from '@/components/loader';
import TracksList from './tracksList';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0); // Durée totale en secondes
  const [currentTime, setCurrentTime] = useState(0); // Temps actuel en secondes
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isRepeating, setIsRepeating] = useState(false);
  const [LyricsOpen, setLyricsOpen] = useState(false);
  const [NextTracksOpen, setNextTracksOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const track = useContext(trackContext);
  const nextTracks = useContext(nextTracksContext);
  const player = useContext(playerContext);

  const getAudio = async (track: ITrack) => {
    const audio = await fetchAudio(track.id);
    setDuration(audio?.durationInSeconds ?? 0);
    setAudioSrc(audio?.objectUrl ?? null);
    setIsLoading(false);
  };

  const handleProgressUpdate = () => {
    if (audioRef.current) {
      const { currentTime } = audioRef.current;
      setCurrentTime(currentTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (track.track) {
      setIsLoading(true);
      getAudio(track.track);
      player.play();
    }
  }, [track.track]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      if (player.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.isPlaying, audioRef.current, audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleProgressUpdate}
          onEnded={() => {
            if (isRepeating) {
              audioRef.current?.play();
            } else {
              if (track.track) {
                const currentIndex = nextTracks.nextTracks
                  ?.map((t) => t.id)
                  ?.indexOf(track.track.id);

                const next = nextTracks.nextTracks?.at(currentIndex! + 1);
                if (next) {
                  track.setTrack(next);
                  return;
                }
              }
              player.pause();
            }
          }}
        />
      )}
      {/* Lyrics */}
      {LyricsOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-screen overflow-y-auto border-t border-neutral-800 bg-white pb-28 dark:border-neutral-800 dark:bg-black">
          <div className="relative flex min-h-full items-center justify-center p-4">
            <div className="fixed right-8 top-8">
              <X
                className="h-6 w-6 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-white dark:hover:text-white"
                onClick={() => setLyricsOpen(false)}
              />
            </div>
            {track.track?.lyrics && (
              <p className="max-w-2xl">
                {track.track.lyrics.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br className="my-1" />
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </div>
      )}
      {/* NextTracks */}
      {NextTracksOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-screen overflow-y-auto border-t border-neutral-800 bg-white pb-28 dark:border-neutral-800 dark:bg-black">
          <div className="relative flex min-h-full items-center justify-center p-4">
            <div className="fixed right-8 top-8">
              <X
                className="h-6 w-6 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:text-white dark:hover:text-white"
                onClick={() => setNextTracksOpen(false)}
              />
            </div>
            <div className="min-w-[60%]">
              <h2 className="mb-4 text-4xl">Suivantes</h2>
              {nextTracks?.nextTracks?.length ? (
                <TracksList tracks={nextTracks.nextTracks} onClick={() => {}} />
              ) : (
                'No next tracks'
              )}
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-28 border-t border-neutral-800 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="grid h-full grid-cols-1 items-center px-4 sm:grid-cols-3">
          {/* Left section - Song info */}
          <div className="flex items-center space-x-4">
            {track.track && (
              <>
                <Image
                  src="https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_1280.jpg"
                  alt="Album cover"
                  className="h-14 w-14 rounded"
                  width={56}
                  height={56}
                />
                <div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-white">
                    {track.track?.title ?? 'Titre inconnu'}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {track.track.artist?.name}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Center section - Player controls */}
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center space-x-6">
                  <button
                    className="text-neutral-500 hover:text-neutral-900 disabled:cursor-default disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white"
                    title="Shuffle"
                    disabled={!nextTracks.nextTracks}
                    onClick={() => {
                      if (!nextTracks.nextTracks) return;
                      if (isShuffling) {
                        setIsShuffling(false);
                        return;
                      }
                      setIsShuffling(true);
                      nextTracks.shuffle(nextTracks.nextTracks);
                    }}
                  >
                    <Shuffle className={`${isShuffling ? 'text-green-500' : ''} h-4 w-4`} />
                  </button>
                  <button
                    className="text-neutral-500 hover:text-neutral-900 disabled:cursor-default disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white"
                    title="Previous"
                    disabled={!nextTracks.nextTracks}
                    onClick={() => {
                      if (!nextTracks.nextTracks || !track.track) return;

                      const currentIndex = nextTracks.nextTracks
                        ?.map((t) => t.id)
                        ?.indexOf(track.track.id);

                      const next = nextTracks.nextTracks?.at(currentIndex! - 1);
                      if (next) {
                        track.setTrack(next);
                      }
                    }}
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 transition hover:scale-105 dark:bg-white"
                    onClick={() => {
                      if (player.isPlaying) {
                        player.pause();
                      } else {
                        player.play();
                      }
                    }}
                  >
                    {player.isPlaying ? (
                      <Pause className="h-5 w-5 text-white dark:text-black" />
                    ) : (
                      <Play className="h-5 w-5 text-white dark:text-black" />
                    )}
                  </button>
                  <button
                    className="text-neutral-500 hover:text-neutral-900 disabled:cursor-default disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white"
                    title="Next"
                    disabled={!nextTracks.nextTracks}
                    onClick={() => {
                      if (!nextTracks.nextTracks || !track.track || !audioRef.current) return;

                      if (isRepeating) {
                        audioRef.current.currentTime = 0;
                        return;
                      }

                      const currentIndex = nextTracks.nextTracks
                        ?.map((t) => t.id)
                        ?.indexOf(track.track.id);

                      const next = nextTracks.nextTracks?.at(currentIndex! + 1);
                      if (next) {
                        track.setTrack(next);
                      }
                    }}
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>

                  <button
                    title="Repeat"
                    className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {isRepeating ? (
                      <Repeat
                        className="h-4 w-4 text-green-600"
                        onClick={() => setIsRepeating(false)}
                      />
                    ) : (
                      <Repeat className="h-4 w-4" onClick={() => setIsRepeating(true)} />
                    )}
                  </button>
                </div>

                <div className="flex w-full items-center space-x-2">
                  <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    className="w-full"
                    onValueChange={handleTimeChange}
                  />
                  <span className="min-w-[40px] text-xs text-neutral-500 dark:text-neutral-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Right section - Volume controls */}
          <div className="hidden items-center justify-end space-x-3 sm:flex">
            <button
              className="text-neutral-500 hover:text-neutral-900 disabled:cursor-default disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white"
              title="lyrics"
              disabled={!track.track?.lyrics}
              onClick={() => {
                if (!track.track?.lyrics) return;
                setLyricsOpen(!LyricsOpen);
              }}
            >
              <Mic2 className="h-4 w-4" />
            </button>
            <button
              className="text-neutral-500 hover:text-neutral-900 disabled:cursor-default disabled:opacity-50 dark:text-neutral-400 dark:hover:text-white"
              title="Playlist"
              disabled={!nextTracks.nextTracks}
              onClick={() => {
                if (!nextTracks.nextTracks) return;
                setNextTracksOpen(!NextTracksOpen);
              }}
            >
              <ListMusic className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2">
              <button
                className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                onClick={() => setVolume(volume === 0 ? 50 : 0)}
              >
                {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={handleVolumeChange}
              />
            </div>
            <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
