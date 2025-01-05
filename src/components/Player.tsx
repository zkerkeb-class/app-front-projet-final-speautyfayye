'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize2,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 196;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-28 border-t border-neutral-800 bg-white dark:border-neutral-800 dark:bg-black">
      <div className="grid h-full grid-cols-1 items-center px-4 sm:grid-cols-3">
        {/* Left section - Song info */}
        <div className="flex items-center space-x-4">
          <Image
            src="https://cdn.pixabay.com/photo/2016/09/10/11/11/musician-1658887_1280.jpg"
            alt="Album cover"
            className="h-14 w-14 rounded"
            width={56}
            height={56}
          />
          <div>
            <div className="text-sm font-medium text-neutral-900 dark:text-white">
              Recommence-moi
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">SANTA</div>
          </div>
        </div>

        {/* Center section - Player controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center space-x-6">
            <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
              <Shuffle className="h-4 w-4" />
            </button>
            <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 transition hover:scale-105 dark:bg-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white dark:text-black" />
              ) : (
                <Play className="h-5 w-5 text-white dark:text-black" />
              )}
            </button>
            <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>
            <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
              <Repeat className="h-4 w-4" />
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

        {/* Right section - Volume controls */}
        <div className="hidden items-center justify-end space-x-3 sm:flex">
          <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            <Mic2 className="h-4 w-4" />
          </button>
          <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            <ListMusic className="h-4 w-4" />
          </button>
          <button className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            <MonitorSpeaker className="h-4 w-4" />
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
  );
};

export default Player;
