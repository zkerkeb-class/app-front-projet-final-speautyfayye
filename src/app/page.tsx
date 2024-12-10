import { getPlaylists } from '@/services/playlists'; // Importer la fonction de service
import { Playlist } from '@/models/playlist';

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
      <div className="mb-8">
        {/* Titre */}
        <h1 className="text-3xl font-semibold">Latest Playlists</h1>
      </div>

      {/* Liste des playlists affichée horizontalement */}
      <div className="flex flex-wrap gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="w-64 flex-shrink-0 cursor-pointer rounded-lg p-4 shadow-md transition-colors"
          >
            {/* Image en haut */}
            <div className="mb-4">Image</div>

            {/* Titre de la playlist en bas */}
            <h3 className="text-center text-lg font-semibold">{playlist.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
