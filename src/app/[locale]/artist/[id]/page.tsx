import ArtistContent from '@/components/ArtistContent';
import { IArtistExt } from '@/models/artist.model';
import { getArtistById } from '@/services/artist.service';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let artist: IArtistExt | null = null;

  try {
    artist = await getArtistById(id);
  } catch (error) {
    console.error('Error fetching artist:', error);
  }

  if (!artist) {
    return (
      <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
        Artist not found.
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
      <ArtistContent artist={artist} />
    </Suspense>
  );
}
