import React from 'react';
import { getPlaylistById } from '@/services/playlists';
import PlaylistContent from '@/components/PlaylistContent';
import { IPlaylistExt } from '@/models/playlist';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let playlist: IPlaylistExt | null = null;

  try {
    playlist = await getPlaylistById(Number(id));
  } catch (error) {
    console.error('Error fetching playlist:', error);
  }

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <PlaylistContent playlist={playlist} />
    </Suspense>
  );
}
