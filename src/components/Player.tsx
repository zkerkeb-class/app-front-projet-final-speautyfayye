'use client';
import { useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
} from 'react-icons/fa';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(50);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 border-t border-neutral-800 bg-gradient-to-b from-black/60 to-black">
      <div className="grid h-full grid-cols-3 items-center px-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-md bg-neutral-800">{/* Image de la chanson */}</div>
          <div>
            <h4 className="text-sm font-semibold text-white">Titre de la chanson</h4>
            <p className="text-xs text-neutral-400">Artiste</p>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-neutral-400 hover:text-white">
              <FaRandom className="h-5 w-5" />
            </button>
            <button className="text-neutral-400 hover:text-white">
              <FaBackward className="h-5 w-5" />
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:scale-105"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <FaPause className="h-5 w-5 text-black" />
              ) : (
                <FaPlay className="h-5 w-5 text-black" />
              )}
            </button>
            <button className="text-neutral-400 hover:text-white">
              <FaForward className="h-5 w-5" />
            </button>
            <button className="text-neutral-400 hover:text-white">
              <FaRedo className="h-5 w-5" />
            </button>
          </div>
          <div className="flex w-full items-center gap-2">
            <span className="text-xs text-neutral-400">0:00</span>
            <div className="h-1 flex-grow rounded-full bg-neutral-800">
              <div className="h-full w-0 rounded-full bg-white hover:bg-green-500" />
            </div>
            <span className="text-xs text-neutral-400">3:45</span>
          </div>
        </div>

        {/* Right: Volume Control */}
        <div className="flex items-center justify-end gap-4">
          <button
            className="text-neutral-400 hover:text-white"
            onClick={() => setVolume(volume === 0 ? 50 : 0)}
          >
            {volume === 0 ? (
              <FaVolumeMute className="h-5 w-5" />
            ) : (
              <FaVolumeUp className="h-5 w-5" />
            )}
          </button>
          <div className="group relative w-24">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-white hover:accent-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
