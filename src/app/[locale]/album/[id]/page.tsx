// page.tsx
import { Suspense } from 'react';
import { getAlbumById } from '@/services/album.service';
import AlbumContent from '@/components/AlbumContent';
import { IAlbumExt } from '@/models/album.model';
import { Loader2 } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let album: IAlbumExt | null = null;

  try {
    album = await getAlbumById(Number(id));
  } catch (error) {
    console.error('Error fetching album:', error);
  }

  if (!album) {
    return (
      <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
        Album not found.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <AlbumContent album={album} />
    </Suspense>
  );
}
