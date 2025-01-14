'use client';

import React, { useRef, useState, useEffect, useContext } from 'react';
import { fetchAudio } from '../services/audio';
import { audioContext, playerContext } from '@/app/providers';
import { ITrack } from '@/models/track';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0); // Progression en pourcentage
  const [duration, setDuration] = useState(0); // Durée totale en secondes
  const [currentTime, setCurrentTime] = useState(0); // Temps actuel en secondes
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const track = useContext(audioContext);
  const player = useContext(playerContext);

  useEffect(() => {
    if (track.track) {
      setIsLoading(true);
      getAudio(track.track);
    }
  }, [track.track]);

  const getAudio = async (track: ITrack) => {
    const audio = await fetchAudio(track.id);
    setDuration(audio?.durationInSeconds ?? 0);
    setAudioSrc(audio?.objectUrl ?? null);
    setIsLoading(false);
    player.play();
  };

  useEffect(() => {
    if (audioRef.current) {
      if (player.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.isPlaying]);

  const handleProgressUpdate = () => {
    if (audioRef.current) {
      const { currentTime } = audioRef.current;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100); // Mise à jour en pourcentage
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (duration * parseInt(e.target.value)) / 100;
      audioRef.current.currentTime = seekTime;
      setProgress(parseInt(e.target.value));
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-gray-800 p-4 text-white shadow-lg">
      {audioSrc ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleProgressUpdate}
          onEnded={() => player.pause()}
        />
      ) : isLoading ? (
        <p>Chargement de l'audio...</p>
      ) : (
        ''
      )}

      {!isLoading && audioSrc && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-400">Titre : {track ? track.track?.title : ''}</p>
        </div>
      )}

      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={() => {
            if (player.isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-slate-400"
          disabled={!audioSrc}
        >
          {player.isPlaying ? 'Pause' : 'Lecture'}
        </button>
        <div className="text-sm text-gray-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full cursor-pointer appearance-none overflow-hidden rounded-lg bg-gray-600"
        disabled={!audioSrc}
      />
    </div>
  );
};

export default AudioPlayer;
