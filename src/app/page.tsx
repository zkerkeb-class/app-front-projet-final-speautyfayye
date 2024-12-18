import { getPlaylists } from '@/services/playlists'; // Importer la fonction de service
import { Playlist } from '@/models/playlist';
import Image from 'next/image';
export default async function Home() {
  // Appeler la fonction du service pour récupérer les playlists
  let playlists: Playlist[] = [];
  try {
    playlists = await getPlaylists(); // On récupère les playlists depuis le service
  } catch (error) {
    console.error('Error fetching playlists:', error);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
          Latest Playlists
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group cursor-pointer rounded-lg bg-card p-4 shadow-md hover:bg-secondary/50 hover:shadow-md"
          >
            <div className="mb-4 overflow-hidden rounded-md">
              <Image
                src="https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_640.jpg"
                alt="playlist"
                width={200}
                height={200}
                priority
              />
            </div>
            <h3 className="truncate text-base font-medium text-foreground group-hover:text-primary md:text-lg">
              {playlist.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
