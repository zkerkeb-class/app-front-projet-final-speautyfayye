'use client';

import { Playlist } from '@/models/playlist';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function CreatePlaylist() {
  const router = useRouter();
  const [playlistName, setPlaylistName] = useState('');

  const createPlaylist = async () => {
    if (!playlistName) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: playlistName }),
      });

      if (response.ok) {
        const data = (await response.json()).data as Playlist;
        router.push(`/playlist/${data.id}`);
      }
    } catch (error) {
      console.error('Failed to create playlist', error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <input
        type="text"
        placeholder="Playlist name"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaylistName(e.target.value)}
        required
      />
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
}
