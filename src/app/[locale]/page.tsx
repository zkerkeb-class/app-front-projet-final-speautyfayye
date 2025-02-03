import Album from '@/components/Album/Album';
import Artists from '@/components/Artists/Artists';
import Category from '@/components/Categories/Category';
import Playlists from '@/components/Playlists/Playlists';

export default async function Home() {
  return (
    <div className="mb-28 flex flex-col gap-5 p-6">
      <Playlists />
      <Artists />
      <Album />
      <Category />
    </div>
  );
}
