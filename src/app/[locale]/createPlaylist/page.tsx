'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { Playlist } from '@/models/playlist.model';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MusicIcon } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
export default function CreatePlaylist() {
  const router = useRouter();
  const [playlistName, setPlaylistName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const translation = useScopedI18n('createPlaylist');
  const createPlaylist = async () => {
    if (!playlistName) {
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      createPlaylist();
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MusicIcon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">{translation('title')}</CardTitle>
          <CardDescription className="text-zinc-400">{translation('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder={translation('placeholder')}
              value={playlistName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaylistName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-zinc-800 bg-black/50 text-lg text-white placeholder:text-zinc-500 focus:border-primary"
              required
            />
            <Button
              className="w-full bg-white text-black hover:bg-zinc-200"
              onClick={createPlaylist}
              disabled={!playlistName || isLoading}
            >
              {isLoading ? translation('loading') : translation('createPlaylist')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
