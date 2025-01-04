import { getPlaylists } from '@/services/playlists';
import { Playlist } from '@/models/playlist';
import SongItem from '@/components/SongItem';
import { IPlaylist } from '@/models/playlist';

export default async function Home() {
  let playlists: IPlaylist[] = [];
  try {
    playlists = await getPlaylists();
  } catch (error) {
    console.error('Error fetching playlists:', error);
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <SongItem
            key={playlist.id}
            title={playlist.title}
            artist="Unknown Artist"
            imageUrl="https://cdn.pixabay.com/photo/2024/02/26/19/51/guitar-8598823_640.jpg"
          />
        ))
      ) : (
        <p>No playlists available.</p>
      )}
    </div>
  );
}
